import { Types } from "mongoose";


export type TPaymentRequest = {
    amount: number;
    cus_name: string;
    cus_email: string;
    cus_phone: string;
    tran_id: string;
  }

  export type TPayment = {
    userEmail: string; // User's email (required)
    totalAmount: number; // Total amount of the payment (required)
    paymentGateway: string; // The payment gateway used (e.g., Aamarpay) (required)
    paymentStatus: string; // The payment status (e.g., "pending", "completed") (required)
    transactionId: string; // Unique transaction ID for the payment (required)
    paymentDate: Date; // Date of the payment (required)
    orderId: Types.ObjectId; // Reference to the associated order (required)
    createdAt?: Date; // Automatically generated createdAt field (optional)
    updatedAt?: Date; // Automatically generated updatedAt field (optional)
  };