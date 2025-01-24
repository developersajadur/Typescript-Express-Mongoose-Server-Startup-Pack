import { model, Schema } from 'mongoose';
import { Order } from './order.interface';
import { BicycleModel } from '../Bicycle/bicycle.model';

const OrderSchema = new Schema<Order>({
  email: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

// pre middleware

OrderSchema.pre<Order>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const order = this;
  order.createdAt = new Date();
  order.updatedAt = new Date();
  next();
});

// post middleware
OrderSchema.post<Order>('save', async function (doc, next) {
  try {
    const { product: productId, quantity } = doc;

    const product = await BicycleModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // check Validate stock
    if (product.quantity < quantity) {
      throw new Error('Insufficient stock for this product');
    }

    // Reduce stock
    product.quantity -= quantity;

    // Set inStock to false if quantity becomes 0
    product.inStock = product.quantity > 0;

    await product.save();

    next();
  } catch (error: any) {
    next(error);
  }
});

export const OrderModel = model<Order>('orders', OrderSchema);
