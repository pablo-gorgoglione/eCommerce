"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const router = express_1.default.Router();
router.route('/').get(productController_1.getProducts).post(AuthMiddleware_1.protect, AuthMiddleware_1.isAdmin, productController_1.createProduct);
router.route('/:id/reviews').post(AuthMiddleware_1.protect, productController_1.createReview);
router.get('/top', productController_1.getTopProducts);
router
    .route('/:id')
    .get(productController_1.getProductsById)
    .delete(AuthMiddleware_1.protect, AuthMiddleware_1.isAdmin, productController_1.deleteProduct)
    .put(AuthMiddleware_1.protect, AuthMiddleware_1.isAdmin, productController_1.updateProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map