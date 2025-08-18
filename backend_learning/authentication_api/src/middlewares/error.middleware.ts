import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: 'Not found' });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, meta: err.meta });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
}
