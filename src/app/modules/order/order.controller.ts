/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tokenDecoder } from "../Auth/auth.utils";
import { TUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import { orderService } from "./order.service";
import httpStatus from "http-status";

const createOrder = catchAsync(async (req, res) => {
  console.log(req.body);
  // const user = (req as any).user;
  const decoded = tokenDecoder(req);
  const {userId} = decoded;
  // console.log(userId);

  const user = await UserModel.findById(userId) as TUser
  // console.log(user);

  // console.log(req.body);
  const order = await orderService.createOrder(user, req.body, req.ip!);

  // Use JSON.stringify to safely convert the order object to a serializable format
  const orderResponse = JSON.parse(JSON.stringify(order));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order placed successfully",
    data: orderResponse,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const order = await orderService.getOrders();

  // Ensure we return only serializable objects
  const ordersResponse = JSON.parse(JSON.stringify(order));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order retrieved successfully",
    data: ordersResponse,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  // Ensure we return only serializable objects
  const verifiedPaymentResponse = JSON.parse(JSON.stringify(order));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order verified successfully",
    data: verifiedPaymentResponse,
  });
});

export const orderController = { createOrder, verifyPayment, getOrders };
