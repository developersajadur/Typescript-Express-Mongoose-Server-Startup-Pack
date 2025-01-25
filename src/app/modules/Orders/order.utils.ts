import { TOrderStatus } from "./order.interface";

export   
const allowedTransitions: Record<TOrderStatus, TOrderStatus[]> = {
  pending: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['delivered', 'cancelled'],
  delivered: ['returned'],
  cancelled: [],
  returned:[],
};