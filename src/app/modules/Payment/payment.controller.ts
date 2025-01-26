import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import { tokenDecoder } from "../Auth/auth.utils";


const createPaymentIntoDb = catchAsync(async (req, res) => {

    const decoded = tokenDecoder(req)
    const {userId} = decoded
 
    const dataToStore = {
        userId,
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
    getAllPayments
}