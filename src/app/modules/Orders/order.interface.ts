import { Types } from "mongoose";

export type TOrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type TOrderItem = {
  productId: Types.ObjectId;
  quantity: number;
  color?: string;
}

export type TOrder = {
  userId: Types.ObjectId;
  items: TOrderItem[];
  totalAmount: number;
  discount?: number;
  finalAmount: number;
  paymentMethod: 'stripe' | 'cash_on_delivery';
  status: TOrderStatus;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
  };
  trackingNumber?: string;
  isPaid: boolean;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
