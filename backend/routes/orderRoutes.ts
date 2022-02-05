import express from 'express';
import {
  addOrderItems,
  createOrderMercadoPago,
  getMyOrders,
  getOrderById,
  getOrders,
  updatedOrderToPaid_Client,
  updateOrderToDelivered,
  updateOrderToPaid,
  updateOrderToPaid_Notification,
} from '../controllers/orderController';
import { isAdmin, protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);
router
  .route('/:id/mercadopago/preference')
  .post(protect, createOrderMercadoPago);
router
  .route('/:id/mercadopago/backs-urls/success/:paymentId')
  .post(updatedOrderToPaid_Client);
router
  .route('/:id/mercadopago/notification-url')
  .post(updateOrderToPaid_Notification);

export default router;
