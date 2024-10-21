import { Request, Response, Router } from "express";
import { RolesController } from "../controllers/roles.controller";

const rolesRouter = Router();
const handler = new RolesController();

rolesRouter.post("/", (req: Request, res: Response) =>
  handler.createRole(req, res)
);

rolesRouter.get("/", (req: Request, res: Response) =>
  handler.getRoles(req, res)
);

rolesRouter.put("/", (req: Request, res: Response) =>
  handler.updateRole(req, res)
);

rolesRouter.get("/:id", (req: Request, res: Response) =>
  handler.getRole(req, res)
);

rolesRouter.delete("/:id", (req: Request, res: Response) =>
  handler.deleteRole(req, res)
);

export default rolesRouter;
