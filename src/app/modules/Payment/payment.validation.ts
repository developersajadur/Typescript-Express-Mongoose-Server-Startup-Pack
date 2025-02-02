import { z } from 'zod';

export const createPaymentValidation = z.object({
  body: z.object({
    userId: z.string().optional(),
  orderId: z.string(),
  amount: z.number().positive(),
  transactionId: z.string().min(1).optional(),
  currency: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  })
});


export const paymentValidationSchema = {
    createPaymentValidation,
}