import status from "http-status";
import AppError from "../../errors/AppError";
import { TPayment } from "./payment.interface";
import { PaymentModel } from "./payment.model";
import { OrderModel } from "../Orders/order.model";
import { TOrder } from "../Orders/order.interface";


const createPaymentIntoDb = async(payment: TPayment) => {

    const order = await OrderModel.findById(payment.orderId) as TOrder
    if(order.isPaid){
        throw new AppError(status.CONFLICT, 'Order is already paid')
    }

    await OrderModel.findByIdAndUpdate(payment.orderId, {isPaid: true, paidAt: new Date()})

    const result = await PaymentModel.create(payment);
    return result;
}


export const paymentService = {
    createPaymentIntoDb,
}