/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import AppError from "../../errors/AppError";
import { TPayment, TPaymentRequest } from "./payment.interface";
import { PaymentModel } from "./payment.model";
import { OrderModel } from "../Orders/order.model";
import { TOrder } from "../Orders/order.interface";
import QueryBuilder from "../../builders/QueryBuilder";
import axios from "axios";
import config from "../../config";



export const initiatePayment = async (paymentData: TPaymentRequest) => {
    try {
      const requestData = {
        store_id: config.aamarpay_store_id,
        amount: paymentData.amount,
        currency: "BDT",
        tran_id: paymentData.tran_id,
        success_url: config.aamarpay_success_url,
        fail_url: config.aamarpay_fail_url,
        cancel_url: config.aamarpay_cancel_url,
        signature_key: config.aamarpay_signature_key,
        cus_name: paymentData.cus_name,
        cus_email: paymentData.cus_email,
        cus_phone: paymentData.cus_phone,
        desc: "Product Purchase",
        type: "json",
      };
  
      const response = await axios.post(config.aamarpay_api_url as string, requestData, {
        headers: { "Content-Type": "application/json" },
      });
    //   console.log(response);
  
      if (response.data?.payment_url) {
        
        return { success: true, payment_url: response.data.payment_url };
      } else {
        throw new AppError(status.FORBIDDEN ,"Failed to initiate payment");
      }
    } catch (error: any) {
        throw new AppError(status.INTERNAL_SERVER_ERROR , error.message);
    }
  };




const createPaymentIntoDb = async(payment: TPayment) => {

    const order = await OrderModel.findById(payment.orderId) as TOrder
    if(order.isPaid){
        throw new AppError(status.CONFLICT, 'Order is already paid')
    }
 
    await OrderModel.findByIdAndUpdate(payment.orderId, {isPaid: true, paidAt: new Date()})

    const result = await PaymentModel.create(payment);
    return result;
}

const getAllPayments = async (query: Record<string, unknown>) => {
    const paymentQuery = new QueryBuilder(PaymentModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await paymentQuery.modelQuery;
    const meta = await paymentQuery.countTotal();
    return {result, meta}
}


export const paymentService = {
    createPaymentIntoDb,
    getAllPayments,
    initiatePayment
}