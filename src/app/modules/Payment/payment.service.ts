/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentModel } from "./payment.model";
import QueryBuilder from "../../builders/QueryBuilder";
import config from "../../config";
import axios from "axios";
import AppError from "../../errors/AppError";
import status from "http-status";

const initiateAamarpayPayment = async (paymentData: Record<string, any>) => {
  const { total_amount, cus_name, cus_email, cus_phone, tran_id, desc } = paymentData;

  // Aamarpay API payload
  const payload = {
    store_id: config.aamarpay_store_id,
    store_passwd: config.aamarpay_store_passwd,
    signature_key: config.aamarpay_signature_key,
    amount: total_amount,
    currency: "BDT", // Aamarpay supports BDT
    tran_id, // Unique transaction ID
    success_url: `${config.base_url}/payment-success`,
    fail_url: `${config.base_url}/payment-failed/${total_amount}/${tran_id}`,
    cancel_url: `${config.base_url}/payment-cancel/${total_amount}/${tran_id}`,
    cus_name,
    cus_email,
    cus_phone,
    desc,
    type: "json",
  };

  try {
    const response = await axios.post("https://sandbox.aamarpay.com/jsonpost.php", payload);

    if (response.data?.payment_url) {
      return { success: true, payment_url: response.data.payment_url };
    }
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to initiate payment.");
  } catch (error) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Aamarpay payment initiation failed.");
  }
};

const savePayment = async (paymentData: Record<string, any>) => {
  try {
    return await PaymentModel.create(paymentData);
  } catch (error) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to save payment data.");
  }
};

const getAllPayments = async (query: Record<string, unknown>) => {
  const paymentQuery = new QueryBuilder(PaymentModel.find(), query).filter().sort().paginate().fields();
  const result = await paymentQuery.modelQuery;
  const meta = await paymentQuery.countTotal();
  return { result, meta };
};

export const paymentService = {
  getAllPayments,
  initiateAamarpayPayment,
  savePayment,
};
