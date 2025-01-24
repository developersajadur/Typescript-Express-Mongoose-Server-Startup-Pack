import { z } from 'zod';

const OrderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  product: z.string().min(1, { message: 'Product ID is required' }),
  quantity: z
    .number()
    .int()
    .min(1, { message: 'Quantity must be a positive integer' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Total price must be a non-negative number' }),
});

export default OrderValidationSchema;
