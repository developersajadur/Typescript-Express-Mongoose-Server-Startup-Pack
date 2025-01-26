/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderModel } from './order.model';
import { BicycleModel } from '../Bicycle/bicycle.model';
import { TOrder, TOrderStatus, TStatus } from './order.interface';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { TBicycle } from '../Bicycle/bicycle.interface';
import QueryBuilder from '../../builders/QueryBuilder';
import { allowedTransitions } from './order.utils';

const createOrderIntoDb = async (order: TOrder) => {
  try {
    // Initialize total amount and discount
    let totalAmount = 0;
    let discountAmount = 0;

    // Validate items and calculate total price concurrently
    const validatedItems = await Promise.all(
      order.items.map(async (item) => {
        const bicycle = await BicycleModel.findById(item.productId) as TBicycle;

        if (!bicycle) {
          throw new AppError(status.NOT_FOUND, `Product with ID ${item.productId} not found`);
        }

        if (bicycle.isDeleted) {
          throw new AppError(status.BAD_REQUEST, `Product with ID ${item.productId} is deleted`);
        }

        if (bicycle.stockQuantity < item.quantity || !bicycle.inStock) {
          throw new AppError(status.BAD_REQUEST, `Insufficient stock for product ID ${item.productId}`);
        }

        // Calculate the price and discount for this item
        const itemTotal = item.quantity * bicycle.price;
        const itemDiscount = bicycle.discount * item.quantity;
        discountAmount += itemDiscount;
        totalAmount += itemTotal; 

        return {
          ...item,
          price: bicycle.price,
          discount: itemDiscount, 
        };
      })
    );

    // Calculate final amount after applying total discount
    const finalAmount = totalAmount - discountAmount;

    // Assign calculated values to the order
    order.items = validatedItems;
    order.totalAmount = totalAmount;
    order.discount = discountAmount;
    order.finalAmount = finalAmount;

    // Save the order in the database
    const result = await OrderModel.create(order)
    return result;
  } catch (error: any) {
    throw new AppError(status.BAD_REQUEST, error.message);
  }
};



// show all orders
const getAllOrder = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(OrderModel.find().populate('items.productId').populate('userId'), query)
  .filter()
  .sort()
  .paginate()
  .fields();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return { result, meta };
};



const getSingleOrderById = async (_id: string) => {
  const order = await OrderModel.findOne({ _id }).populate('items.productId').populate('userId');
  if (!order){
    throw new AppError(status.NOT_FOUND, 'Order Not Found')
  }
  return order;
};



// change status of a order
const changeOrderStatus = async(statusPayload: TStatus) => {
  const order = await OrderModel.findById(statusPayload?.orderId)
  if (!order) {
    throw new AppError(status.NOT_FOUND, 'Order not found');
  }
  const currentStatus = order.status as TOrderStatus;
  const newStatus = statusPayload.orderStatus as TOrderStatus;

  if (!allowedTransitions[currentStatus].includes(newStatus)) {
    throw new AppError(status.BAD_REQUEST, `Cannot change status from ${currentStatus} to ${newStatus}`);
  }
  const result = await OrderModel.findByIdAndUpdate( statusPayload.orderId, {status: newStatus, updatedAt: new Date()}, {new: true})

  return result;
}

// Calculate total revenue from all orders
const showTotalRevenue = async () => {
  const totalRevenue = await OrderModel.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    { $project: { _id: 0, totalRevenue: 1 } },
  ]);
  return totalRevenue[0]?.totalRevenue || 0;
};

export const orderService = {
  createOrderIntoDb,
  showTotalRevenue,
  getAllOrder,
  changeOrderStatus,
  getSingleOrderById
};
