import status from "http-status";
import QueryBuilder from "../../builders/QueryBuilder";
import { userSearchableFields } from "./user.constant";
import {  TUser } from "./user.interface";
import { UserModel } from "./user.model";
import AppError from "../../errors/AppError";

const createUserIntoDb = async (user: TUser) => {
    const isUserExist = await UserModel.findOne({ email: user.email });

    if (isUserExist) {
      if (isUserExist.phone === user.phone) {
        throw new AppError(status.BAD_REQUEST, 'User with this phone number already exists');
      }
      throw new AppError(status.BAD_REQUEST, 'User with this email already exists');
    }

    const result = await UserModel.create(user);
    return result;
};

const getSingleUser = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if(!user){
    throw new AppError(status.NOT_FOUND, 'User not found');
  }
  return user;
}

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(UserModel.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  
  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return { result, meta };
};


const updateUser = async (userId: string, userInfo: Partial<TUser>) => {

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (user.isBlocked) {
    throw new AppError(status.FORBIDDEN, "User is blocked");
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { ...userInfo, updatedAt: new Date() },
    { new: true, runValidators: true }
  );

  return updatedUser;
};




export const userService = {
  createUserIntoDb,
  getAllUsers,
  getSingleUser,
  updateUser,
};
