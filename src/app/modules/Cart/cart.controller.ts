import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tokenDecoder } from "../Auth/auth.utils";
import { cartService } from "./cart.service";


const addToCart = catchAsync(async (req, res) => {
    // console.log(req);
    const decoded = await tokenDecoder(req)
    const { userId } = decoded;
    const cart = req.body; 

const result = await cartService.addToCart(userId, cart);
sendResponse(res, {
  statusCode: status.OK,
  success: true,
  message: 'Cart added successfully',
  data: result, 
});
});



export const cartController = {
    addToCart,
}