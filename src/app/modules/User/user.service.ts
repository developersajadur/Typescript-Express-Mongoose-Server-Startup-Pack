/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import QueryBuilder from "../../builders/QueryBuilder";
import { userSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import AppError from "../../errors/AppError";


const createUserIntoDb = async (user: TUser) => {
    try {
      const isUserExist = await UserModel.findOne({ email: user.email });
  
      if (isUserExist) {
        if (isUserExist.number === user.number) {
          throw new AppError(status.BAD_REQUEST, 'User with this phone number already exists');
        }
        throw new AppError(status.BAD_REQUEST, 'User with this email already exists');
      }

      const result = await UserModel.create(user);
      return result;
    } catch (error: any) {
      throw new AppError(status.INTERNAL_SERVER_ERROR, error.message);
    }
  };
  

const getAllUsers = async (query: Record<string, unknown>) => {
    const userQuery = new QueryBuilder(UserModel.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
    
    const result = await userQuery.modelQuery;
    const meta = await userQuery.countTotal();
    return {result, meta}
}


export const userService = {
    createUserIntoDb,
    getAllUsers,
}