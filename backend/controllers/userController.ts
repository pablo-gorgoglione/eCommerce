import User from '../models/userModel';
import asyncHandler from 'express-async-handler';
import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

//@desc Auth user & get token
//@route POST /api/users/login
//@acess Public
export const AuthUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
    return;
  }

  res.status(401);
  throw new Error('Invalid email or password');
});

//@desc Register a new user
//@route POST /api/users
//@acess Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exist');
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
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
        token: generateToken(user._id),
      });
      return;
    }

    res.status(400);
    throw new Error('Invalid user data');
  }
);

//@desc Get user profile
//@route POST /api/users/profile
//@acess Private
export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user?._id);

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
  }
);

//@desc Update user profile
//@route PUT /api/users/profile
//@acess Private
export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user?._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashPassword;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    }
    res.status(404);
    throw new Error('User not found');
  }
);

//@desc Get all users
//@route PUT /api/users
//@acess Private
export const getUsersProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await User.find({});
    res.json(users);
    return;
  }
);

//@desc Delete user
//@route PUT /api/users/:id
//@acess Private
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed succesfully' });
    return;
  }
  res.status(404);
  throw new Error('User not found');
});

//@desc Get user by id
//@route PUT /api/users/:id
//@acess Private/Admin
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
    return;
  }
  res.status(404);
  throw new Error('User not found');
});

//@desc Update user
//@route PUT /api/users/:id
//@acess Private/Admin
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

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
});
