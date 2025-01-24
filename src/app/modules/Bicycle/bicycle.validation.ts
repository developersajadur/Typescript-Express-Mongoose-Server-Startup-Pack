import { z } from 'zod';

const BicycleValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  type: z.string().min(1, { message: 'Type is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  quantity: z
    .number()
    .int()
    .min(0, { message: 'Quantity must be a non-negative integer' }),
  inStock: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default BicycleValidationSchema;
