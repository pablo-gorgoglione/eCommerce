import express from 'express';
import {
  createProduct,
  createReview,
  deleteProduct,
  getProducts,
  getProductsById,
  getTopProducts,
  updateProduct,
} from '../controllers/productController';
import { isAdmin, protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);

router.route('/:id/reviews').post(protect, createReview);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductsById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

export default router;
