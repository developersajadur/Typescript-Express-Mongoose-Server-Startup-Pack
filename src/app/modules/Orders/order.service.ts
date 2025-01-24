import { Order } from './order.interface';
import { OrderModel } from './order.model';
import { BicycleModel } from '../Bicycle/bicycle.model';

const createOrderDb = async (order: Order) => {
  const product = await BicycleModel.findById(order.product);
  if (!product) {
    throw new Error('Product not found');
  }

  const totalPrice = product.price * order.quantity;
  order.totalPrice = totalPrice;

  const result = await OrderModel.create(order);
  return result;
};

// show all orders
const showAllOrders = async () => {
  const orders = await OrderModel.find({});
  return orders;
};

// Calculate total revenue from all orders
const showTotalRevenue = async () => {
  const totalRevenue = await OrderModel.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    { $project: { _id: 0, totalRevenue: 1 } },
  ]);
  return totalRevenue[0]?.totalRevenue || 0;
};

export const OrderService = {
  createOrderDb,
  showTotalRevenue,
  showAllOrders,
};
