import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RolesService } from "../services/roles.service";
import { Roles } from "../db/tables";
import { string } from "valibot";
import { User } from "../schemas/users.schema";

const roleService = new RolesService();
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if ((token as string)?.startsWith("Bearer ")) {
    token = (token as string).replace(/Bearer /, "");
  }
  if (!token) return res.status(403).json({ message: "please login" });
  jwt.verify(
    token as string,
    process.env.TOKEN_SECRET!,
    async (err, decoded) => {
      if (err) {
        return res.status(408).json({ message: "invalid token" });
      }
      const user = decoded as User;
      const allowed = roleService.isAllowed(
        {
          baseUrl: req.baseUrl,
          method: req.method,
          path: req.path,
        },
        user
      );
      next();
    }
  );
};
