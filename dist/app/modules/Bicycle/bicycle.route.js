"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.biCycleRoute = void 0;
const express_1 = __importDefault(require("express"));
const bicycle_controller_1 = require("./bicycle.controller");
const router = express_1.default.Router();
router.post('/products', bicycle_controller_1.BicycleController.createBicycle);
router.get('/products', bicycle_controller_1.BicycleController.findAllBiCycle);
router.get('/products/:productId', bicycle_controller_1.BicycleController.findBiCycleById);
router.put('/products/:productId', bicycle_controller_1.BicycleController.updateBiCycleById);
router.delete('/products/:productId', bicycle_controller_1.BicycleController.deleteBiCycleById);
exports.biCycleRoute = router;
