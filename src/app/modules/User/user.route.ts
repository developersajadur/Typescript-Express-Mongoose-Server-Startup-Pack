import { Router } from "express";
import { userController } from "./user.controller";


const router = Router()

router.post('/register', userController.createUserIntoDb)
router.get('/', userController.getAllUsers)


export const userRoute = router;