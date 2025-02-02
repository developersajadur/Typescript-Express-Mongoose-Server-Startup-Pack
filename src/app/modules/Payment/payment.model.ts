import { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";

// Define the schema for the payment model
const paymentSchema = new Schema<TPayment>({
  userEmail: { type: String, required: true }, // User's email
  totalAmount: { type: Number, required: true }, // Total amount of the payment
  paymentGateway: { type: String, required: true }, // Payment gateway (e.g., Aamarpay)
  paymentStatus: { type: String, required: true, default: "pending" }, // Status of the payment
  transactionId: { type: String, required: true, unique: true }, // Unique transaction ID for the payment
  paymentDate: { type: Date, default: Date.now }, // Date and time when the payment was made
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true }, // Reference to the associated order
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Payment model
export const PaymentModel = model('Payment', paymentSchema);
