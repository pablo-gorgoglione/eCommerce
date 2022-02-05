import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import asyncHandler from 'express-async-handler';

interface Token {
  id: string;
  iat: number;
  exp: number;
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret) as Token;
        req.user = await User.findById(decoded.id).select('-password');
        next();
        return;
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not Authorized, bad token');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
    return;
  }
  res.status(401);
  throw new Error('Not authorizd, you are not an admin');
};
