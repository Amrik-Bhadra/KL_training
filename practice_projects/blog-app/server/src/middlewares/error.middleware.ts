import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiErrors';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message, details: err.details ?? null });
  }

  // Mongoose validation example
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message, details: err.errors });
  }

  res.status(500).json({ message: 'Internal Server Error' });
}
