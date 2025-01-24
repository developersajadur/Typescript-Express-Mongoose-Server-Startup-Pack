import { Router } from "express";
import { biCycleRoute } from "../modules/Bicycle/bicycle.route";



const router = Router();

const moduleRoutes = [
    {
        path: '/bicycles',
        route: biCycleRoute
    },
]






moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;