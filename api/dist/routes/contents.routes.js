"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contents_controller_1 = require("../controllers/contents.controller");
const contentRouter = (0, express_1.Router)();
const handler = new contents_controller_1.ContentsController();
contentRouter.post("/", (req, res) => handler.createContent(req, res));
contentRouter.put("/", (req, res) => handler.updateContent(req, res));
exports.default = contentRouter;
