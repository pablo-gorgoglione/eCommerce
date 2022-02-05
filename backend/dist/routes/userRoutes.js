"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const router = express_1.default.Router();
router
    .route('/:id')
    .put(AuthMiddleware_1.protect, AuthMiddleware_1.isAdmin, userController_1.updateUser)
    .delete(AuthMiddleware_1.protect, AuthMiddleware_1.isAdmin, userController_1.deleteUser)
    .get(AuthMiddleware_1.protect, userController_1.getUserById);
router.route('/').post(userController_1.registerUser).get(AuthMiddleware_1.protect, AuthMiddleware_1.isAdmin, userController_1.getUsersProfile);
router.post('/login', userController_1.AuthUser);
router
    .route('/profile')
    .get(AuthMiddleware_1.protect, userController_1.getUserProfile)
    .put(AuthMiddleware_1.protect, userController_1.updateUserProfile);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map