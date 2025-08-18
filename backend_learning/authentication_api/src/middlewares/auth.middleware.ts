import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return next(new ApiError(401, 'Unauthorized'));
  try {
    const payload: any = jwt.verify(token, env.JWT_ACCESS_SECRET);
    // attach minimal user to request
    (req as any).user = { id: payload.id, role: payload.role };
    next();
  } catch (e) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
}
