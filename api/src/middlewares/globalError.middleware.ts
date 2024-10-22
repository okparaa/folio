import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../types";

export const globalError = (
  error: HTTPError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message ?? "global unknown server error";
  return res.status(statusCode).json({ message });
};
