"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
var tables_1 = require("../db/tables");
var injector_1 = require("../decorators/injector");
var users_repository_1 = require("../repository/users.repository");
var bcryptjs_1 = require("bcryptjs");
var drizzle_orm_1 = require("drizzle-orm");
var error_utils_1 = require("../utils/error.utils");
var jsonwebtoken_1 = require("jsonwebtoken");
var UsersService = function () {
    var _a;
    var _repo_decorators;
    var _repo_initializers = [];
    var _repo_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UsersService() {
                this.repo = __runInitializers(this, _repo_initializers, void 0);
                __runInitializers(this, _repo_extraInitializers);
            }
            UsersService.prototype.signup = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var hashedPassword, pass, createdUser, user, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                // Ensure passwords match
                                if (data.pass !== data.password) {
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("Passwords do not match")];
                                }
                                // Validate required fields
                                if (!data.username || !data.password) {
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("Username or password not provided")];
                                }
                                return [4 /*yield*/, bcryptjs_1.default.hash(data.password, 10)];
                            case 1:
                                hashedPassword = _b.sent();
                                pass = data.pass, createdUser = __rest(data, ["pass"]);
                                return [4 /*yield*/, this.repo.create(__assign(__assign({}, createdUser), { password: hashedPassword }))];
                            case 2:
                                user = (_b.sent());
                                // Ensure the user was created successfully
                                if (!(user === null || user === void 0 ? void 0 : user.id)) {
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("User creation failed")];
                                }
                                // Return the created user
                                return [2 /*return*/, user];
                            case 3:
                                error_1 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_1.message || "An unexpected error occurred")];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            };
            UsersService.prototype.createTokens = function (username) {
                return __awaiter(this, void 0, void 0, function () {
                    var user, accessTokenSecret, refreshTokenSecret, accessToken, refreshToken, password, role, rest, currentUser, error_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.repo.getUserByUsername(username)];
                            case 1:
                                user = (_b.sent());
                                if (!user.id) {
                                    throw new Error("User not found");
                                }
                                accessTokenSecret = process.env.TOKEN_SECRET;
                                refreshTokenSecret = process.env.REFRESH_SECRET;
                                if (!accessTokenSecret || !refreshTokenSecret) {
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("Token secrets are not defined in environment variables")];
                                }
                                accessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, accessTokenSecret, { expiresIn: "4h", algorithm: "HS256" });
                                refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, refreshTokenSecret, { expiresIn: "7d" } // Refresh token expiry is usually longer than access token
                                );
                                password = user.password, role = user.role, rest = __rest(user, ["password", "role"]);
                                currentUser = __assign(__assign({}, rest), { accessToken: accessToken });
                                return [2 /*return*/, { currentUser: currentUser, refreshToken: refreshToken }];
                            case 2:
                                error_2 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_2.message || "An unexpected error occurred")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            UsersService.prototype.updateUser = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var user, error_3;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.repo.update(data)];
                            case 1:
                                user = (_b.sent());
                                // Destructure to exclude the password field from the returned object
                                // Return the updated user data without the password
                                return [2 /*return*/, user];
                            case 2:
                                error_3 = _b.sent();
                                // Handle potential errors such as update failure
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_3.message || "An unexpected error occurred")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            UsersService.prototype.getUsers = function (limit, offset) {
                return __awaiter(this, void 0, void 0, function () {
                    var error_4;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                if (limit <= 0)
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("Limit must be greater than 0")];
                                if (offset < 0)
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("Offset cannot be negative")];
                                return [4 /*yield*/, this.repo.find(limit, offset)];
                            case 1: return [2 /*return*/, _b.sent()];
                            case 2:
                                error_4 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_4.message || "An unexpected error occurred")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            UsersService.prototype.getUser = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    var error_5;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                if (!id)
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("id is required")];
                                return [4 /*yield*/, this.repo.findOne(id)];
                            case 1: return [2 /*return*/, _b.sent()];
                            case 2:
                                error_5 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_5.message || "An unexpected error occurred")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            UsersService.prototype.verifyUser = function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var user, userExists, passwordMatch, _b, error_6;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 5, , 6]);
                                return [4 /*yield*/, this.repo.getUserByUsername(input.username)];
                            case 1:
                                user = (_c.sent());
                                userExists = !!(user && user.id);
                                if (!userExists) return [3 /*break*/, 3];
                                return [4 /*yield*/, bcryptjs_1.default.compare(input.password, user.password)];
                            case 2:
                                _b = _c.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                _b = false;
                                _c.label = 4;
                            case 4:
                                passwordMatch = _b;
                                return [2 /*return*/, userExists && passwordMatch];
                            case 5:
                                error_6 = _c.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_6.message || "An unexpected error occurred")];
                            case 6: return [2 /*return*/];
                        }
                    });
                });
            };
            UsersService.prototype.isUsernameAvailable = function (username) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, error_7;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                if (!username)
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("username is required")];
                                return [4 /*yield*/, this.repo.db.execute((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT 1 FROM ", " WHERE username = ", " LIMIT 1"], ["SELECT 1 FROM ", " WHERE username = ", " LIMIT 1"])), this.repo.table, username))];
                            case 1:
                                result = _b.sent();
                                return [2 /*return*/, result.rowCount == 0]; // Return true if no rows found, else false
                            case 2:
                                error_7 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_7.message || "An unexpected error occurred")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            UsersService.prototype.isPhoneAvailable = function (phone) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, error_8;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                if (!phone)
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("phone is required")];
                                return [4 /*yield*/, this.repo.db.execute((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SELECT 1 FROM ", " WHERE phone = ", " LIMIT 1"], ["SELECT 1 FROM ", " WHERE phone = ", " LIMIT 1"])), this.repo.table, phone))];
                            case 1:
                                result = _b.sent();
                                return [2 /*return*/, result.rowCount == 0]; // Return true if no rows found, else false
                            case 2:
                                error_8 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_8.message || "An unexpected error occurred")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            return UsersService;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _repo_decorators = [(0, injector_1.Inject)(users_repository_1.UsersRepository, tables_1.users)];
            __esDecorate(null, null, _repo_decorators, { kind: "field", name: "repo", static: false, private: false, access: { has: function (obj) { return "repo" in obj; }, get: function (obj) { return obj.repo; }, set: function (obj, value) { obj.repo = value; } }, metadata: _metadata }, _repo_initializers, _repo_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UsersService = UsersService;
var templateObject_1, templateObject_2;
