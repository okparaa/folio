import { UsersController } from "../controllers/users.controller";
import { Request, Response, Router } from "express";

const userRouter = Router();
const handler = new UsersController();

userRouter.post("/signup", (req: Request, res: Response) =>
  handler.signup(req, res)
);

userRouter.post("/signin", (req: Request, res: Response) =>
  handler.signin(req, res)
);

userRouter.put("/", (req: Request, res: Response) =>
  handler.updateUser(req, res)
);

userRouter.get("/", (req: Request, res: Response) =>
  handler.getUsers(req, res)
);

userRouter.get("/:id", (req: Request, res: Response) =>
  handler.getUser(req, res)
);

export default userRouter;
