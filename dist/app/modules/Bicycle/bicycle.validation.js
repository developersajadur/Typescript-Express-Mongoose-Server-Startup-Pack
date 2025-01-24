"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const BicycleValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Name is required' }),
    brand: zod_1.z.string().min(1, { message: 'Brand is required' }),
    price: zod_1.z.number().min(0, { message: 'Price must be a positive number' }),
    type: zod_1.z.string().min(1, { message: 'Type is required' }),
    description: zod_1.z.string().min(1, { message: 'Description is required' }),
    quantity: zod_1.z
        .number()
        .int()
        .min(0, { message: 'Quantity must be a non-negative integer' }),
    inStock: zod_1.z.boolean(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.default = BicycleValidationSchema;
