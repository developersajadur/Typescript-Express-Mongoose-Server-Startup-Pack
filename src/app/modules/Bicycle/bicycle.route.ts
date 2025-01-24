import express from 'express';
import { bicycleController } from './bicycle.controller';

const router = express.Router();

router.post('/create-bicycle', bicycleController.createBicycle);
router.get('/', bicycleController.getAllBiCycles);
router.get('/:id', bicycleController.getSingleBiCycleById);
router.put('/:id', bicycleController.updateSingleBiCycleById);
router.delete('/:id', bicycleController.deleteSingleBiCycleById);

export const biCycleRoute = router;
