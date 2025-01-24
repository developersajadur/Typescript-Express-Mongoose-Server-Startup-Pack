import { Router } from "express";
import { biCycleRoute } from "../modules/Bicycle/bicycle.route";
import { userRoute } from "../modules/User/user.route";



const router = Router();

const moduleRoutes = [
    {
        path: '/bicycles',
        route: biCycleRoute
    },
    {
        path: '/users',
        route: userRoute
    },
]






moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;