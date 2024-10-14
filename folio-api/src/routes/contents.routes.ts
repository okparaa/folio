import { Request, Response, Router } from "express";
import { ContentsController } from "../controllers/contents.controller";
import { flatten, safeParse } from "valibot";
import { ContentSchema, NewContentSchema } from "../schemas/contents.schema";

const contentRouter = Router();
const handler = new ContentsController();

contentRouter.post("/", (req, res) => handler.createContent(req, res));

contentRouter.put("/", (req, res) => handler.updateContent(req, res));

export default contentRouter;
