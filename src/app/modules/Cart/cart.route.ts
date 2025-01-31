import { Router } from "express";
import { cartController } from "./cart.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";


const router = Router();

router.post('/add-to-cart',auth(USER_ROLE.customer), cartController.addToCart)


export const cartRoute = router;