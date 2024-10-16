"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const roles_service_1 = require("../services/roles.service");
const roleService = new roles_service_1.RolesService();
const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (token === null || token === void 0 ? void 0 : token.startsWith("Bearer ")) {
        token = token.replace(/Bearer /, "");
    }
    if (!token)
        return res.status(403).json({ message: "please login" });
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(408).json({ message: "invalid token" });
        }
        const user = decoded;
        const allowed = roleService.isAllowed({
            baseUrl: req.baseUrl,
            method: req.method,
            path: req.path,
        }, user);
        next();
    }));
};
exports.verifyToken = verifyToken;
