"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var roles_controller_1 = require("../controllers/roles.controller");
var rolesRouter = (0, express_1.Router)();
var handler = new roles_controller_1.RolesController();
rolesRouter.post("/", function (req, res) { return handler.createRole(req, res); });
rolesRouter.get("/", function (req, res) { return handler.getRoles(req, res); });
rolesRouter.put("/", function (req, res) { return handler.updateRole(req, res); });
rolesRouter.get("/:id", function (req, res) { return handler.getRole(req, res); });
rolesRouter.delete("/:id", function (req, res) { return handler.deleteRole(req, res); });
rolesRouter.patch("/addperm/:id", function (req, res) {
    return handler.addRolePermissions(req, res);
});
rolesRouter.patch("/delperm/:id", function (req, res) {
    return handler.delRolePermisions(req, res);
});
exports.default = rolesRouter;
