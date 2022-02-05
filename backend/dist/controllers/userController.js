"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsersProfile = exports.updateUserProfile = exports.getUserProfile = exports.registerUser = exports.AuthUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
//@desc Auth user & get token
//@route POST /api/users/login
//@acess Public
exports.AuthUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id),
        });
        return;
    }
    res.status(401);
    throw new Error('Invalid email or password');
}));
//@desc Register a new user
//@route POST /api/users
//@acess Public
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exist');
    }
    // hash the password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(password, salt);
    const user = yield userModel_1.default.create({
        name,
        email,
        password: hashPassword,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id),
        });
        return;
    }
    res.status(400);
    throw new Error('Invalid user data');
}));
//@desc Get user profile
//@route POST /api/users/profile
//@acess Private
exports.getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield userModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
        return;
    }
    res.status(404);
    throw new Error('User not found');
}));
//@desc Update user profile
//@route PUT /api/users/profile
//@acess Private
exports.updateUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield userModel_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
            user.password = hashPassword;
        }
        const updatedUser = yield user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: (0, generateToken_1.default)(updatedUser._id),
        });
    }
    res.status(404);
    throw new Error('User not found');
}));
//@desc Get all users
//@route PUT /api/users
//@acess Private
exports.getUsersProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find({});
    res.json(users);
    return;
}));
//@desc Delete user
//@route PUT /api/users/:id
//@acess Private
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id);
    if (user) {
        yield user.remove();
        res.json({ message: 'User removed succesfully' });
        return;
    }
    res.status(404);
    throw new Error('User not found');
}));
//@desc Get user by id
//@route PUT /api/users/:id
//@acess Private/Admin
exports.getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
        return;
    }
    res.status(404);
    throw new Error('User not found');
}));
//@desc Update user
//@route PUT /api/users/:id
//@acess Private/Admin
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;
        const updatedUser = yield user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
        return;
    }
    res.status(404);
    throw new Error('User not found');
}));
//# sourceMappingURL=userController.js.map