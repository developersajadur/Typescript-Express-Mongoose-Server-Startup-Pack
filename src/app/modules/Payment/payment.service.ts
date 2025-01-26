import status from "http-status";
import AppError from "../../errors/AppError";
import { TPayment } from "./payment.interface";
import { PaymentModel } from "./payment.model";
import { OrderModel } from "../Orders/order.model";
import { TOrder } from "../Orders/order.interface";
import QueryBuilder from "../../builders/QueryBuilder";


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
    getAllPayments
}