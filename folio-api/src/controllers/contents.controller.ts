import { Inject } from "../decorators/injector";
import { ContentsService } from "../services/contents.service";
import { ContentSchema, NewContentSchema } from "../schemas/contents.schema";
import { Request, Response } from "express";
import { flatten, safeParse } from "../utils/validation.util";

export class ContentsController {
  @Inject(ContentsService) service: ContentsService;
  async createContent(req: Request, res: Response) {
    try {
      const result = safeParse(NewContentSchema, req.body);
      if (result.issues) {
        return res.status(400).json(flatten(result.issues));
      }
      const data = await this.service.createContent(result.output);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async updateContent(req: Request, res: Response) {
    try {
      const result = safeParse(ContentSchema, req.body);

      if (result.issues) {
        return res.status(400).json(flatten(result.issues));
      }
      const data = await this.service.updateContent(result.output);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
