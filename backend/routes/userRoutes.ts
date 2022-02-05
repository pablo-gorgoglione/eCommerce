import express from 'express';
import {
  AuthUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsersProfile,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController';
import { isAdmin, protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router
  .route('/:id')
  .put(protect, isAdmin, updateUser)
  .delete(protect, isAdmin, deleteUser)
  .get(protect, getUserById);

router.route('/').post(registerUser).get(protect, isAdmin, getUsersProfile);
router.post('/login', AuthUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
