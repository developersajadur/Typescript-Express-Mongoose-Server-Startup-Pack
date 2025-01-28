import { Types } from "mongoose";
import { TPaymentMethod } from "../Orders/order.interface";


export type TPaymentRequest = {
    amount: number;
    cus_name: string;
    cus_email: string;
    cus_phone: string;
    tran_id: string;
  }

  export type TPayment = {
    userId?: Types.ObjectId;
    orderId: Types.ObjectId;
    amount: number;
    transactionId?: string;
    paymentMethod: TPaymentMethod;
    currency: string;
    createdAt?: Date;
    updatedAt?: Date;
  }