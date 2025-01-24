export type Order = {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
  createdAt?: string | unknown;
  updatedAt?: string | unknown;
};
