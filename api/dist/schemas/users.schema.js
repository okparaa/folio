"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninSchema = exports.SignupSchema = exports.UsersSchema = exports.BaseUserSchema = void 0;
const v = __importStar(require("valibot"));
const users_service_1 = require("../services/users.service");
const usersService = new users_service_1.UsersService();
exports.BaseUserSchema = v.object({
    id: v.string(),
    surname: v.pipe(v.string("should be string"), v.nonEmpty("value is required"), v.maxLength(30, "surname too long")),
    role: v.pipe(v.string("should be string"), v.nonEmpty("value is required")),
    firstname: v.pipe(v.string("should be string"), v.maxLength(30, "firstname too long")),
    lastname: v.pipe(v.string("should be string"), v.nonEmpty("value is required"), v.maxLength(30, "lastname too long")),
    photoUrl: v.string(),
});
exports.UsersSchema = v.required(v.partial(exports.BaseUserSchema), ["id"]);
exports.SignupSchema = v.pipeAsync(v.objectAsync(Object.assign(Object.assign({}, v.omit(exports.BaseUserSchema, ["id", "photoUrl", "role"]).entries), { username: v.pipeAsync(v.string("email not string"), v.nonEmpty("email empty"), v.email("email badly formated"), v.maxLength(50, "email too long"), v.checkAsync((input) => __awaiter(void 0, void 0, void 0, function* () { return (yield usersService.isUsernameAvailable(input)); }), "username in use.")), phone: v.pipeAsync(v.string("should be string"), v.regex(/[(080)|(081)][0-9]{9}/), v.checkAsync((input) => __awaiter(void 0, void 0, void 0, function* () { return (yield usersService.isPhoneAvailable(input)); }), "Phone number in use")), pass: v.pipe(v.string("should be string"), v.nonEmpty("value is empty"), v.maxLength(30, "password too long")), password: v.pipe(v.string("should be string"), v.minLength(6, "password too short."), v.maxLength(30, "password too long.")) })), v.forward(v.partialCheck([["pass"], ["password"]], (input) => input.pass === input.password, "password missmatch."), ["password"]));
exports.SigninSchema = v.pipeAsync(v.object({
    username: v.pipe(v.string("should be string"), v.nonEmpty("value is required"), v.maxLength(50, "username too long")),
    password: v.pipe(v.string("should be string"), v.nonEmpty("value is require"), v.maxLength(50, "password too long")),
}), v.forwardAsync(v.partialCheckAsync([["username"], ["password"]], (input) => __awaiter(void 0, void 0, void 0, function* () { return (yield usersService.verifyUser(input)); }), "invalid credentials"), ["username"]));
