import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import { tokenDecoder } from '../Auth/auth.utils';
import { v4 as uuidv4 } from 'uuid';
import { orderService } from './order.service';
import AppError from '../../errors/AppError';


const createOrderIntoDb = catchAsync(async (req, res) => {
  const decoded = tokenDecoder(req)
  const { userId } = decoded;
  const order = req?.body;
  const trackingNumber = uuidv4();
  const dataToStore = { ...order, userId: userId, trackingNumber: trackingNumber };
  const result = await orderService.createOrderIntoDb(dataToStore)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Order Placed successfully',
    data: result,
  })
})

// show all orders

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await req?.body;
  const result = await orderService.getAllOrder(orders)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  })

})

const changeOrderStatus = catchAsync(async (req, res) => {
  const { orderId, orderStatus } = req.body;
  const result = await orderService.changeOrderStatus({orderId, orderStatus});
  if(!result) {
    throw new AppError(status.NOT_FOUND, 'Order not found')
  }
  const dataToSend = {
    orderId: result._id,
    orderStatus: result.status,
  }
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Order ${orderStatus} successfully`,
    data: dataToSend,
  })
})

// showTotalRevenue

const showTotalRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRevenue = await OrderService.showTotalRevenue();
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: {
        totalRevenue,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch total revenue. Please try again.',
      error: error.message || 'An unexpected error occurred',
    });
  }
};

export const orderController = {
  createOrderIntoDb,
  showTotalRevenue,
  getAllOrders,
  changeOrderStatus
};
