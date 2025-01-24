import QueryBuilder from "../../builders/QueryBuilder";
import { userSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";


const createUserIntoDb = async (user: TUser) => {
    const result = await UserModel.create(user);
    return result;
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
    return {result, meta}
}


export const userService = {
    createUserIntoDb,
    getAllUsers,
}