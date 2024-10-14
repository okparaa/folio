import { Router } from "express";
import { RoutesController } from "../controllers/routes.controller";

const routesRouter = Router();
const handler = new RoutesController();

routesRouter.post("/", (req, res) => handler.createRoute(req, res));

routesRouter.put("/", (req, res) => handler.updateRoute(req, res));

routesRouter.get("/", (req, res) => handler.getRoutes(req, res));

routesRouter.get("/:id", (req, res) => handler.getRoute(req, res));

routesRouter.delete("/:id", (req, res) => handler.delete(req, res));

export default routesRouter;
