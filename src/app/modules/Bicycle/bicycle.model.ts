import { model, Schema } from 'mongoose';
import { TBicycle } from './bicycle.interface';

const BicycleSchema = new Schema<TBicycle>( {
  author: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  videoUrl: {
    type: String,
    default: null,
  },
  colors: {
    type: [String],
    required: true,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
},
{
  timestamps: true, //* Automatically adds createdAt and updatedAt fields
});

// pre middleware

// BicycleSchema.pre<Bicycle>('save', function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const biCycle = this;
//   biCycle.createdAt = new Date();
//   biCycle.updatedAt = new Date();

//   next();
// });

export const BicycleModel = model<TBicycle>('bicycle', BicycleSchema);
