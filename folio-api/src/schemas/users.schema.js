"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninSchema = exports.SignupSchema = exports.UsersSchema = exports.BaseUserSchema = void 0;
var v = require("valibot");
var users_service_1 = require("../services/users.service");
var usersService = new users_service_1.UsersService();
exports.BaseUserSchema = v.object({
    id: v.string(),
    surname: v.pipe(v.string("should be string"), v.nonEmpty("value is required"), v.maxLength(30, "surname too long")),
    role: v.pipe(v.string("should be string"), v.nonEmpty("value is required")),
    firstname: v.pipe(v.string("should be string"), v.maxLength(30, "firstname too long")),
    lastname: v.pipe(v.string("should be string"), v.nonEmpty("value is required"), v.maxLength(30, "lastname too long")),
    photoUrl: v.string(),
});
exports.UsersSchema = v.required(v.partial(exports.BaseUserSchema), ["id"]);
exports.SignupSchema = v.pipeAsync(v.objectAsync(__assign(__assign({}, v.omit(exports.BaseUserSchema, ["id", "photoUrl", "role"]).entries), { username: v.pipeAsync(v.string("email not string"), v.nonEmpty("email empty"), v.email("email badly formated"), v.maxLength(50, "email too long"), v.checkAsync(function (input) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersService.isUsernameAvailable(input)];
            case 1: return [2 /*return*/, (_a.sent())];
        }
    }); }); }, "username in use.")), phone: v.pipeAsync(v.string("should be string"), v.regex(/[(080)|(081)][0-9]{9}/), v.checkAsync(function (input) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersService.isPhoneAvailable(input)];
            case 1: return [2 /*return*/, (_a.sent())];
        }
    }); }); }, "Phone number in use")), pass: v.pipe(v.string("should be string"), v.nonEmpty("value is empty"), v.maxLength(30, "password too long")), password: v.pipe(v.string("should be string"), v.minLength(6, "password too short."), v.maxLength(30, "password too long.")) })), v.forward(v.partialCheck([["pass"], ["password"]], function (input) { return input.pass === input.password; }, "password missmatch."), ["password"]));
exports.SigninSchema = v.pipeAsync(v.object({
    username: v.pipe(v.string("should be string"), v.nonEmpty("value is required"), v.maxLength(50, "username too long")),
    password: v.pipe(v.string("should be string"), v.nonEmpty("value is require"), v.maxLength(50, "password too long")),
}), v.forwardAsync(v.partialCheckAsync([["username"], ["password"]], function (input) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, usersService.verifyUser(input)];
        case 1: return [2 /*return*/, (_a.sent())];
    }
}); }); }, "invalid credentials"), ["username"]));
