/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderModel } from './order.model';
import { BicycleModel } from '../Bicycle/bicycle.model';
import { TOrder } from './order.interface';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { TBicycle } from '../Bicycle/bicycle.interface';
import QueryBuilder from '../../builders/QueryBuilder';

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
};
