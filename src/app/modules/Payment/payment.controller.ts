import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import { tokenDecoder } from "../Auth/auth.utils";





const initiatePayment = catchAsync(async (req, res) => {
    const { amount, cus_name, cus_email, cus_phone } = req.body;
    const tran_id = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    const payment = await paymentService.initiatePayment({amount, tran_id, cus_name, cus_email, cus_phone})
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Payment initiated successfully',
        data: payment,
    })

})





const createPaymentIntoDb = catchAsync(async (req, res) => {

    const tran_id = `TXN_${Date.now()}`;

    const decoded = tokenDecoder(req)
    const {userId} = decoded
 
    const dataToStore = {
        userId,
        tran_id,
       ...req.body,
    }
    const payment = await paymentService.createPaymentIntoDb(dataToStore)

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Payment successful',
        data: payment,
    })
})

const getAllPayments = catchAsync(async (req, res) => {
    const payments =  await paymentService.getAllPayments(req.query)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Payments retrieved successfully',
        data: payments,
    })
})


export const paymentController = {
    createPaymentIntoDb,
    getAllPayments,
    initiatePayment
}