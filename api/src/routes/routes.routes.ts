import { Request, Response, Router } from "express";
import { RoutesController } from "../controllers/routes.controller";

const routesRouter = Router();
const handler = new RoutesController();

routesRouter.post("/", (req: Request, res: Response) =>
  handler.createRoute(req, res)
);

routesRouter.put("/", (req: Request, res: Response) =>
  handler.updateRoute(req, res)
);

routesRouter.get("/", (req: Request, res: Response) =>
  handler.getRoutes(req, res)
);

routesRouter.get("/:id", (req: Request, res: Response) =>
  handler.getRoute(req, res)
);

routesRouter.delete("/:id", (req: Request, res: Response) =>
  handler.delete(req, res)
);

export default routesRouter;
