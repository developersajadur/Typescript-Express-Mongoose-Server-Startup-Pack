import { z } from 'zod';

const createBicycleValidation = z.object({
  body: z.object({
    author: z.string({ message: 'Author is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    brand: z.string().min(1, { message: 'Brand is required' }),
    price: z.number().min(0, { message: 'Price must be a positive number' }),
    category: z.string().min(1, { message: 'Category is required' }), // Updated from 'type' to 'category'
    description: z.string().min(1, { message: 'Description is required' }),
    stockQuantity: z
      .number()
      .int()
      .min(0, { message: 'Stock quantity must be a non-negative integer' }),
    inStock: z.boolean(),
    isDeleted: z.boolean(),
    images: z.array(z.string().url()).min(1, { message: 'At least one image is required' }),
    videoUrl: z.string().url().optional(),
    colors: z.array(z.string().min(1)).min(1, { message: 'At least one color is required' }),
    weight: z.number().min(0, { message: 'Weight must be a non-negative number' }),
    discount: z.number().min(0, { message: 'Discount must be a non-negative number' }).optional(),
    createdAt: z.union([z.string().datetime(), z.date()]).optional(),
    updatedAt: z.union([z.string().datetime(), z.date()]).optional(),
  })
});


const updateBicycleValidation = z.object({
  body: z.object({
    author: z.string({ message: 'Author is required' }).optional(),
    name: z.string().min(1, { message: 'Name is required' }).optional(),
    brand: z.string().min(1, { message: 'Brand is required' }).optional(),
    price: z.number().min(0, { message: 'Price must be a positive number' }).optional(),
    category: z.string().min(1, { message: 'Category is required' }).optional(),
    description: z.string().min(1, { message: 'Description is required' }).optional(),
    stockQuantity: z
      .number()
      .int()
      .min(0, { message: 'Stock quantity must be a non-negative integer' })
      .optional(),
    inStock: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    images: z
      .array(z.string().url())
      .min(1, { message: 'At least one image is required' })
      .optional(),
    videoUrl: z.string().url().optional(),
    colors: z
      .array(z.string().min(1))
      .min(1, { message: 'At least one color is required' })
      .optional(),
    weight: z.number().min(0, { message: 'Weight must be a non-negative number' }).optional(),
    discount: z.number().min(0, { message: 'Discount must be a non-negative number' }).optional(),
    updatedAt: z.union([z.string().datetime(), z.date()]).optional(),
  }),
});


export const BicycleValidationSchema = {
  createBicycleValidation,
  updateBicycleValidation,
}
