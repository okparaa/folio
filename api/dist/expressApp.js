"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contents_routes_1 = __importDefault(require("./routes/contents.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const routes_routes_1 = __importDefault(require("./routes/routes.routes"));
const roles_routes_1 = __importDefault(require("./routes/roles.routes"));
const headers_middleware_1 = require("./middlewares/headers.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(headers_middleware_1.headers);
app.use("/contents", contents_routes_1.default);
app.use("/users", users_routes_1.default);
app.use("/routes", routes_routes_1.default);
app.use("/roles", roles_routes_1.default);
exports.default = app;
