import { UsersController } from "../controllers/users.controller";
import { Router } from "express";

const userRouter = Router();
const handler = new UsersController();

userRouter.post("/signup", (req, res) => handler.signup(req, res));

userRouter.post("/signin", (req, res) => handler.signin(req, res));

userRouter.put("/", (req, res) => handler.updateUser(req, res));

userRouter.get("/", (req, res) => handler.getUsers(req, res));

userRouter.get("/:id", (req, res) => handler.getUser(req, res));

export default userRouter;
