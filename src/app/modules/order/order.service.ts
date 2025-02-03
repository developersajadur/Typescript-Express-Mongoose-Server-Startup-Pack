import Order from "./order.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { orderUtils } from "./order.utils";
import { TUser } from "../User/user.interface";
import { BicycleModel } from "../Bicycle/bicycle.model";

const createOrder = async (
  user: TUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string
) => {
  if (!payload?.products?.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");
  }

  const products = payload.products;
  let totalPrice = 0;

  // Fetch product details & update stock
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await BicycleModel.findById(item.product);
      if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, `Product not found`);
      }
      if (!product.inStock || product.stockQuantity < item.quantity) {
        throw new AppError(
          httpStatus.NOT_ACCEPTABLE,
          `Not enough stock for ${product.name}`
        );
      }

      // Deduct stock
      product.stockQuantity -= item.quantity;

      // If stock reaches 0, set inStock to false
      if (product.stockQuantity === 0) {
        product.inStock = false;
      }

      // Save updated product stock
      await product.save();

      const subtotal = (product.price || 0) * item.quantity;
      totalPrice += subtotal;

      return { product: product._id, quantity: item.quantity };
    })
  );

  // Create the order
  const order = await Order.create({
    user: user._id,
    products: productDetails,
    totalPrice,
  });

  // Payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    await Order.findByIdAndUpdate(order._id, {
      $set: {
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      },
    });
  }

  return payment.checkout_url;
};



const getOrders = async () => {
  // Using `.lean()` to return plain JavaScript objects
  const data = await Order.find().lean();
  return data;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};

export const orderService = {
  createOrder,
  getOrders,
  verifyPayment,
};
