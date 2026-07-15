import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import AppError from '../../shared/utils/errors/appError';
import { ENVIRONMENT } from '../../config/environment';

export const sendErrorDev = (err: AppError, res: Response) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message,
    error: err.message,
    name: err.name,
    stack: err.stack,
  });
};

export const sendErrorProd = (err: AppError, res: Response) => {
  const statusCode = err.statusCode || 500;
  // Always send something in prod, not only when isOperational
  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      message: err.message,
    });
  }
  // programming error - don't leak details
  console.error('ERROR 💥', err);
  return res.status(500).json({
    success: false,
    message: `This wasn't supposed to happen Our engineers are working on it. How about a fresh start?`,
  });
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): unknown => {
  if (res.headersSent) {
    return next(err);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Special cases first - before dev/prod split
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      error: 'CORS policy violation',
      message: 'Origin not allowed',
    });
  }

  if (
    [
      'ExpiredCodeException',
      'NotAuthorizedException',
      'TokenExpiredError',
      'JsonWebTokenError',
      'Error',
    ].includes(err.name)
  ) {
    return res.status(err.statusCode || 401).json({
      success: false,
      message: err.message,
    });
  }

  if (ENVIRONMENT.APP.env === 'development') {
    return sendErrorDev(err, res);
  }

  // production
  return sendErrorProd(err, res);
};
