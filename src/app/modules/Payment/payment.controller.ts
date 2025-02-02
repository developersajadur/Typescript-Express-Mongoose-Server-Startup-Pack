import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import AppError from "../../errors/AppError";
import axios from "axios";
import config from "../../config";
import { tokenDecoder } from "../Auth/auth.utils";
import { UserModel } from "../User/user.model";

// Aamarpay Payment Initiation
const initiateAamarpayPayment = catchAsync(async (req, res) => {
  const { total_amount, cus_name, cus_email, cus_phone, tran_id, desc } = req.body;

  if (!total_amount || !cus_name || !cus_email || !cus_phone || !tran_id) {
    throw new AppError(status.BAD_REQUEST, "Missing required payment fields.");
  }

  const paymentResponse = await paymentService.initiateAamarpayPayment({
    total_amount,
    cus_name,
    cus_email,
    cus_phone,
    tran_id,
    desc,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Payment initiated successfully",
    data: paymentResponse,
  });
});

// Aamarpay Payment Success Callback
const paymentSuccessCallback = catchAsync(async (req, res) => {
  const { tran_id, pay_status, amount } = req.body;

  const decoded = tokenDecoder(req);
  const { userId } = decoded;
  const user = await UserModel.findById(userId);

  try {

    

    if (verificationResponse.data.status === "success") {
      const paymentData = {
        userId: user?._id,
        totalAmount: amount,
        paymentGateway: "Aamarpay",
        paymentStatus: pay_status === "Successful" ? "completed" : "failed",
        transactionId: tran_id,
        paymentDate: new Date(),
      };

      await paymentService.savePayment(paymentData);

      sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Payment successful and recorded",
        data: paymentData,
      });
    } else {
      throw new AppError(status.BAD_REQUEST, "Payment verification failed.");
    }
  } catch (error) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Error during payment verification.");
  }
});

// Get all payments
const getAllPayments = catchAsync(async (req, res) => {
  const payments = await paymentService.getAllPayments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: payments,
  });
});

export const paymentController = {
  getAllPayments,
  initiateAamarpayPayment,
  paymentSuccessCallback,
};
