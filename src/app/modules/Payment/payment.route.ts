import { Router } from "express";
import { paymentController } from "./payment.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { paymentValidationSchema } from "./payment.validation";


const router = Router()

router.post('/create-payment', auth(USER_ROLE.customer), validateRequest(paymentValidationSchema.createPaymentValidation), paymentController.createPaymentIntoDb)

export const paymentRoutes = router;