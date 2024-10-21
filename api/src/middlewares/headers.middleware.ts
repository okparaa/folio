import { NextFunction, Request, Response } from "express";

export const headers = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Control-Type");
  next();
};
