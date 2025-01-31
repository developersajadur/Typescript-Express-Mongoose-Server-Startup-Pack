import status from "http-status";
import AppError from "../../errors/AppError";
import { TCarts } from "../User/user.interface";
import { UserModel } from "../User/user.model";

const addToCart = async (userId: string, cart: TCarts) => {
  // Find the user by ID
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  const existingCartItem = user?.carts?.find(
    (item) => item.productId.toString() === cart.productId.toString()
  );

  if (existingCartItem) {
    throw new AppError(status.CONFLICT, 'Cart already exists');
  } else {
    user?.carts?.push(cart);
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { carts: user.carts }, 
    { new: true } 
  );

  if (!updatedUser) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, 'Failed to update cart');
  }


  return updatedUser;
};

export const cartService = {
  addToCart,
};
