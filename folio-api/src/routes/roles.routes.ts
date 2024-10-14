import { Router } from "express";
import { RolesController } from "../controllers/roles.controller";

const rolesRouter = Router();
const handler = new RolesController();

rolesRouter.post("/", (req, res) => handler.createRole(req, res));

rolesRouter.get("/", (req, res) => handler.getRoles(req, res));

rolesRouter.put("/", (req, res) => handler.updateRole(req, res));

rolesRouter.get("/:id", (req, res) => handler.getRole(req, res));

rolesRouter.delete("/:id", (req, res) => handler.deleteRole(req, res));

rolesRouter.patch("/addperm/:id", (req, res) =>
  handler.addRolePermissions(req, res)
);

rolesRouter.patch("/delperm/:id", (req, res) =>
  handler.delRolePermisions(req, res)
);

export default rolesRouter;
