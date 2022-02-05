"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const router = express_1.default.Router();
router.route('/').post(AuthMiddleware_1.protect, orderController_1.addOrderItems).get(AuthMiddleware_1.protect, AuthMiddleware_1.isAdmin, orderController_1.getOrders);
router.route('/myorders').get(AuthMiddleware_1.protect, orderController_1.getMyOrders);
router.route('/:id').get(AuthMiddleware_1.protect, orderController_1.getOrderById);
router.route('/:id/pay').put(AuthMiddleware_1.protect, orderController_1.updateOrderToPaid);
router.route('/:id/deliver').put(AuthMiddleware_1.protect, AuthMiddleware_1.isAdmin, orderController_1.updateOrderToDelivered);
router
    .route('/:id/mercadopago/preference')
    .post(AuthMiddleware_1.protect, orderController_1.createOrderMercadoPago);
router
    .route('/:id/mercadopago/backs-urls/success/:paymentId')
    .post(orderController_1.updatedOrderToPaid_Client);
router
    .route('/:id/mercadopago/notification-url')
    .post(orderController_1.updateOrderToPaid_Notification);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map