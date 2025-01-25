import { Schema, model } from 'mongoose';
import { TOrder, TOrderItem } from './order.interface';

const OrderItemSchema = new Schema<TOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  color: { type: String },
});

const OrderSchema = new Schema<TOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['stripe', 'cash_on_delivery'], required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    trackingNumber: { type: String, default: null },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const OrderModel = model<TOrder>('Order', OrderSchema)

