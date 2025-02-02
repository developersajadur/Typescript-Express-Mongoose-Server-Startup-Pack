import { Router } from "express";
import { paymentController } from "./payment.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

// Route to get all payments (only for admins)
router.get('/', auth(USER_ROLE.admin), paymentController.getAllPayments);

// Route to initiate payment (only for customers)
router.post('/initiate', auth(USER_ROLE.customer), paymentController.initiateAamarpayPayment);

router.post("/payment/success", paymentController.paymentSuccessCallback);

export const paymentRoutes = router;
