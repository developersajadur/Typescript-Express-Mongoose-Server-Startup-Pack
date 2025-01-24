import express from 'express';
import { BicycleController } from './bicycle.controller';

const router = express.Router();

router.post('/products', BicycleController.createBicycle);
router.get('/products', BicycleController.findAllBiCycle);
router.get('/products/:productId', BicycleController.findBiCycleById);
router.put('/products/:productId', BicycleController.updateBiCycleById);
router.delete('/products/:productId', BicycleController.deleteBiCycleById);

export const biCycleRoute = router;
