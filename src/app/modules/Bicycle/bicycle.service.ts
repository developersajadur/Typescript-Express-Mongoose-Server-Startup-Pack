import QueryBuilder from '../../builders/QueryBuilder';
import { bicycleSearchableFields } from './bicycle.constant';
import { TBicycle } from './bicycle.interface';
import { BicycleModel } from './bicycle.model';

const createBicycleIntoDb = async (bicycle: TBicycle) => {
  const result = await BicycleModel.create(bicycle);
  return result;
};
const getAllBiCycle = async (query: Record<string, unknown>) => {
  const biCycleQuery = new QueryBuilder(BicycleModel.find(), query)
  .search(bicycleSearchableFields)
  .filter()
  .sort()
  .paginate()
  .fields();

  const result = await biCycleQuery.modelQuery;
  const meta = await biCycleQuery.countTotal();
  return { data: result, meta };
}
const getSingleBiCycleById = async (_id: string) => {
  const result = await BicycleModel.findOne({ _id });
  return result;
};

const updateSingleBiCycleById = async (_id: string, updatedBicycle: TBicycle) => {
  const result = await BicycleModel.findByIdAndUpdate(
    _id,
    { ...updatedBicycle, updatedAt: new Date() },
    { new: true },
  );
  return result;
};

const deleteSingleBiCycleById = async (_id: string) => {
  const result = await BicycleModel.findByIdAndUpdate(_id, {isDeleted: true, updatedAt: new Date()},
    { new: true },
  );
  return result;
};

export const BicycleService = {
  createBicycleIntoDb,
  getAllBiCycle,
  getSingleBiCycleById,
  updateSingleBiCycleById,
  deleteSingleBiCycleById,
};
