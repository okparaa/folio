import { NextFunction, Request, Response } from "express";
import { CreateError } from "../utils/error.utils";

export const operationsError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = `${req.originalUrl} does not exist on this server`;
  const statusCode = 404;
  const error = new CreateError(statusCode, message);
  error.isOperational = true;
  next(error);
};
