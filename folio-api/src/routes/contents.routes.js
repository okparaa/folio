"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contents_controller_1 = require("../controllers/contents.controller");
var contentRouter = (0, express_1.Router)();
var handler = new contents_controller_1.ContentsController();
contentRouter.post("/", function (req, res) { return handler.createContent(req, res); });
contentRouter.put("/", function (req, res) { return handler.updateContent(req, res); });
exports.default = contentRouter;
