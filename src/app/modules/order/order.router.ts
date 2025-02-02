import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
const orderRouter = Router();

orderRouter.get("/verify", auth(USER_ROLE.customer), orderController.verifyPayment);

orderRouter
  .route("/")
  .post(auth(USER_ROLE.customer), orderController.createOrder)
  .get(auth(USER_ROLE.customer), orderController.getOrders);

export default orderRouter;
