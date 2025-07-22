// src/middlewares/errorHandler.ts

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/appError';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  // If it's an instance of AppError, use its status code
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      data: null,
    });
  }

  // Fallback for unhandled errors
  return res.status(500).json({
    message: 'Internal Server Error',
  });
};

export default errorHandler;
