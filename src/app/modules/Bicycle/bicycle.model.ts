import { model, Schema } from 'mongoose';
import { Bicycle } from './bicycle.interface';

const BicycleSchema = new Schema<Bicycle>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

// pre middleware

BicycleSchema.pre<Bicycle>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const biCycle = this;
  biCycle.createdAt = new Date();
  biCycle.updatedAt = new Date();

  next();
});

export const BicycleModel = model<Bicycle>('bicycle', BicycleSchema);
