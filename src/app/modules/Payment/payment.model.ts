import { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";


const paymentModel = new Schema<TPayment>({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    orderId: { type: Schema.Types.ObjectId, required: true, ref: 'Order' },
    amount: { type: Number, required: true },
    transactionId: { type: String},
    paymentMethod: { type: String, required: true, enum: ['stripe', 'aamar_pay', 'cash_on_delivery'] },
    currency: { type: String, required: true },
  }, { timestamps: true }); 


  export const PaymentModel = model('Payment', paymentModel);