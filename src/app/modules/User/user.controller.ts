import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';
import { tokenDecoder } from '../Auth/auth.utils';

const createUserIntoDb = catchAsync(async (req, res) => {
  const user = await userService.createUserIntoDb(req?.body);
  const responseData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'WOW! Registration successful',
    data: responseData,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers(req?.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});



export const userController = {
  createUserIntoDb,
  getAllUsers,
};
