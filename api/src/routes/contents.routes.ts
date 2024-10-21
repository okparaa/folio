import { Request, Response, Router } from "express";
import { ContentsController } from "../controllers/contents.controller";

const contentRouter = Router();
const handler = new ContentsController();

contentRouter.post("/", (req: Request, res: Response) =>
  handler.createContent(req, res)
);

contentRouter.put("/", (req: Request, res: Response) =>
  handler.updateContent(req, res)
);

export default contentRouter;
