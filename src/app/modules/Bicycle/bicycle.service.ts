import { Bicycle } from './bicycle.interface';
import { BicycleModel } from './bicycle.model';

const createBicycleDb = async (bicycle: Bicycle) => {
  const result = await BicycleModel.create(bicycle);
  return result;
};
const getAllBiCycle = async (filter = {}) => {
  const result = await BicycleModel.find(filter);
  return result;
};
const getSingleBiCycleById = async (_id: string) => {
  const result = await BicycleModel.findOne({ _id });
  return result;
};

const updateBiCycleById = async (_id: string, updatedBicycle: Bicycle) => {
  const result = await BicycleModel.findByIdAndUpdate(
    _id,
    { ...updatedBicycle, updatedAt: new Date() },
    { new: true },
  );
  return result;
};

const deleteBiCycleById = async (_id: string) => {
  const result = await BicycleModel.findByIdAndDelete(_id);
  return result;
};

export const BicycleService = {
  createBicycleDb,
  getAllBiCycle,
  getSingleBiCycleById,
  updateBiCycleById,
  deleteBiCycleById,
};
