import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidationSchema } from './order.validation';

const router = express.Router();

router.post('/placed-order',auth(USER_ROLE.customer), validateRequest(orderValidationSchema.createOrderValidation), orderController.createOrderIntoDb);
router.get('/', auth(USER_ROLE.admin), orderController.getAllOrders);
router.get('/:id', auth(USER_ROLE.admin), orderController.getSingleOrderById);
router.post('/change-order-status', auth(USER_ROLE.admin), validateRequest(orderValidationSchema.changeOrderStatusValidation), orderController.changeOrderStatus);
// router.get('/orders/revenue', orderController.showTotalRevenue);

export const orderRoute = router;
