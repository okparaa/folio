"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.UsersController = void 0;
var validation_util_1 = require("../utils/validation.util");
var users_schema_1 = require("../schemas/users.schema");
var users_service_1 = require("../services/users.service");
var injector_1 = require("../decorators/injector");
var query_schema_1 = require("../schemas/query.schema");
var UsersController = function () {
    var _a;
    var _service_decorators;
    var _service_initializers = [];
    var _service_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UsersController() {
                this.service = __runInitializers(this, _service_initializers, void 0);
                __runInitializers(this, _service_extraInitializers);
            }
            UsersController.prototype.signup = function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, flattenedIssues, response, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                return [4 /*yield*/, (0, validation_util_1.safeParseAsync)(users_schema_1.SignupSchema, req.body, {
                                        abortPipeEarly: true,
                                    })];
                            case 1:
                                result = _b.sent();
                                // Handle validation errors
                                if (result.issues) {
                                    flattenedIssues = (0, validation_util_1.flatten)(result.issues);
                                    return [2 /*return*/, res.status(400).json(flattenedIssues)]; // Bad request with validation issues
                                }
                                return [4 /*yield*/, this.service.signup(result.output)];
                            case 2:
                                response = (_b.sent());
                                if (!(response === null || response === void 0 ? void 0 : response.id))
                                    return [2 /*return*/, res.status(405).json({ message: "Registration failed" })];
                                // Respond with a success status
                                return [2 /*return*/, res.status(201).json(response)];
                            case 3:
                                error_1 = _b.sent();
                                // Handle unexpected errors and return a generic error message
                                return [2 /*return*/, res
                                        .status(500)
                                        .json({ message: error_1.message || "Internal Server Error" })];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            };
            UsersController.prototype.signin = function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, tokenUser, refreshToken, currentUser, error_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                return [4 /*yield*/, (0, validation_util_1.safeParseAsync)(users_schema_1.SigninSchema, req.body, {
                                        abortPipeEarly: true,
                                    })];
                            case 1:
                                result = _b.sent();
                                // Handle validation errors
                                if (result.issues) {
                                    return [2 /*return*/, res.status(400).json((0, validation_util_1.flatten)(result.issues))]; // Return bad request with validation issues
                                }
                                return [4 /*yield*/, this.service.createTokens(result.output.username)];
                            case 2:
                                tokenUser = _b.sent();
                                // Handle token generation failure
                                if (!tokenUser) {
                                    return [2 /*return*/, res
                                            .status(404)
                                            .json({ message: "Could not create user and token" })];
                                }
                                refreshToken = tokenUser.refreshToken, currentUser = tokenUser.currentUser;
                                if (!refreshToken) {
                                    return [2 /*return*/, res.status(404).json({ message: "Could not create token" })];
                                }
                                // Destructure and set cookie with refresh token
                                res.cookie("refreshToken", refreshToken, {
                                    httpOnly: true,
                                    secure: true, // Ensures cookies are only sent over HTTPS
                                });
                                // Respond with the current user object
                                return [2 /*return*/, res.status(200).json(currentUser)];
                            case 3:
                                error_2 = _b.sent();
                                // Handle unexpected errors
                                return [2 /*return*/, res
                                        .status(500)
                                        .json({ message: error_2.message || "Internal Server Error" })];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            };
            UsersController.prototype.getUsers = function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var query, result, limit, offset, users, error_3;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                query = req.query;
                                result = (0, validation_util_1.safeParse)(query_schema_1.RequestQuerySchema, query);
                                // Handling validation issues
                                if (result.issues) {
                                    return [2 /*return*/, res.status(400).json((0, validation_util_1.flatten)(result.issues))];
                                }
                                limit = parseInt(result.output.l);
                                offset = parseInt(result.output.o);
                                return [4 /*yield*/, this.service.getUsers(limit, offset)];
                            case 1:
                                users = _b.sent();
                                //return 404 if service did not return users
                                if (!users || !Array.isArray(users)) {
                                    return [2 /*return*/, res
                                            .status(404)
                                            .json({ message: "Service returned invalid users" })];
                                }
                                //return the users
                                return [2 /*return*/, res.status(200).json(users)];
                            case 2:
                                error_3 = _b.sent();
                                return [2 /*return*/, res.status(500).json({
                                        message: error_3 instanceof Error ? error_3.message : "Internal Server Error",
                                    })];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            UsersController.prototype.getUser = function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var id, user, error_4;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                id = req.params.id;
                                // Check if ID is provided
                                if (!id) {
                                    return [2 /*return*/, res.status(400).json({ message: "ID is not provided" })];
                                }
                                return [4 /*yield*/, this.service.getUser(id)];
                            case 1:
                                user = _b.sent();
                                // If the user does not exist, return a 404 status
                                if (!user) {
                                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                                }
                                // Return the user details
                                return [2 /*return*/, res.status(200).json(user)];
                            case 2:
                                error_4 = _b.sent();
                                return [2 /*return*/, res.status(500).json({
                                        message: error_4 instanceof Error ? error_4.message : "Internal Server Error",
                                    })];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            UsersController.prototype.updateUser = function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, updatedUser, error_5;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                result = (0, validation_util_1.safeParse)(users_schema_1.UsersSchema, req.body, {
                                    abortPipeEarly: true,
                                });
                                // Handle validation issues
                                if (result.issues) {
                                    return [2 /*return*/, res.status(400).json((0, validation_util_1.flatten)(result.issues))];
                                }
                                return [4 /*yield*/, this.service.updateUser(result.output)];
                            case 1:
                                updatedUser = _b.sent();
                                // If the user is not found, return a 404 response
                                if (!updatedUser) {
                                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                                }
                                // Return the updated user
                                return [2 /*return*/, res.status(200).json(updatedUser)];
                            case 2:
                                error_5 = _b.sent();
                                return [2 /*return*/, res.status(500).json({
                                        message: error_5 instanceof Error ? error_5.message : "Internal Server Error",
                                    })];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            return UsersController;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _service_decorators = [(0, injector_1.Inject)(users_service_1.UsersService)];
            __esDecorate(null, null, _service_decorators, { kind: "field", name: "service", static: false, private: false, access: { has: function (obj) { return "service" in obj; }, get: function (obj) { return obj.service; }, set: function (obj, value) { obj.service = value; } }, metadata: _metadata }, _service_initializers, _service_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UsersController = UsersController;
