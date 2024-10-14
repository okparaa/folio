"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var tables_1 = require("../db/tables");
var injector_1 = require("../decorators/injector");
var roles_repository_1 = require("../repository/roles.repository");
var error_utils_1 = require("../utils/error.utils");
var RolesService = function () {
    var _a;
    var _repo_decorators;
    var _repo_initializers = [];
    var _repo_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RolesService() {
                this.repo = __runInitializers(this, _repo_initializers, void 0);
                __runInitializers(this, _repo_extraInitializers);
            }
            RolesService.prototype.createRole = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.repo.create(data)];
                            case 1:
                                result = (_b.sent());
                                if (!result || !result.id) {
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("Could not create role")];
                                }
                                return [2 /*return*/, result];
                            case 2:
                                error_1 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_1.message ||
                                        "An unexpected error occurred while creating the role")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            RolesService.prototype.updateRole = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, error_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.repo.update(data)];
                            case 1:
                                result = (_b.sent());
                                if (!result || !result.id) {
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("Could not update role")];
                                }
                                return [2 /*return*/, result];
                            case 2:
                                error_2 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_2.message ||
                                        "An unexpected error occurred while updating the role")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            RolesService.prototype.getRoles = function (limit, offset) {
                return __awaiter(this, void 0, void 0, function () {
                    var error_3;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.repo.find(limit, offset)];
                            case 1: return [2 /*return*/, _b.sent()];
                            case 2:
                                error_3 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_3.message ||
                                        "An unexpected error occurred while getting the roles")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            RolesService.prototype.getRole = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    var role, error_4;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.repo.findOne(id)];
                            case 1:
                                role = _b.sent();
                                if (!role) {
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("Role with id ".concat(id, " not found"))];
                                }
                                return [2 /*return*/, role];
                            case 2:
                                error_4 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_4.message ||
                                        "An unexpected error occurred while getting the role")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            RolesService.prototype.addRolePermissions = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var error_5;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                // First, delete exsting role permissions
                                return [4 /*yield*/, this.delRolePermissions(data)];
                            case 1:
                                // First, delete exsting role permissions
                                _b.sent();
                                return [4 /*yield*/, this.repo.addRolePermissions(data)];
                            case 2: 
                            // Then, add new rol permissions
                            return [2 /*return*/, (_b.sent())];
                            case 3:
                                error_5 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_5.message ||
                                        "An unexpected error occurred while getting the roles")];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            };
            RolesService.prototype.delRolePermissions = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var error_6;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.repo.removeRolePermissions(data)];
                            case 1: return [2 /*return*/, _b.sent()];
                            case 2:
                                error_6 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_6.message ||
                                        "An unexpected error occurred while getting the roles")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            RolesService.prototype.patchRole = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var role, error_7;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.repo.update(data)];
                            case 1:
                                role = (_b.sent());
                                if (!role || !role.id) {
                                    return [2 /*return*/, (0, error_utils_1.throwErr)("Failed to update role with id ".concat(data.id))];
                                }
                                return [2 /*return*/, role];
                            case 2:
                                error_7 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_7.message ||
                                        "An unexpected error occurred while getting the roles")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            RolesService.prototype.notDuplicate = function (name) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, error_8;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.repo.db.execute((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT * FROM ", " WHERE name = ", " "], ["SELECT * FROM ", " WHERE name = ", " "])), this.repo.table, name))];
                            case 1:
                                result = _b.sent();
                                return [2 /*return*/, result.rowCount == 0 ? true : false];
                            case 2:
                                error_8 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_8.message ||
                                        "An unexpected error occurred while getting the roles")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            RolesService.prototype.isSameRole = function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, error_9;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.repo.db.execute((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SELECT * FROM ", " WHERE name = ", ""], ["SELECT * FROM ", " WHERE name = ", ""])), this.repo.table, input.role))];
                            case 1:
                                result = _b.sent();
                                if (result.rowCount && result.rows[0].id !== input.id) {
                                    return [2 /*return*/, false]; //another role with name exist
                                }
                                return [2 /*return*/, true];
                            case 2:
                                error_9 = _b.sent();
                                return [2 /*return*/, (0, error_utils_1.throwErr)(error_9.message ||
                                        "An unexpected error occurred while getting the roles")];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * routeId.crud,routeId.crud
             * @param data
             * @param user
             */
            RolesService.prototype.isAllowed = function (info, user) {
                return __awaiter(this, void 0, void 0, function () {
                    var permissions, baseUrl, route, error_10;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.repo.findByRoleName(user.role)];
                            case 1:
                                permissions = _b.sent();
                                baseUrl = info.baseUrl.replace(/(^\/|\/$)/g, "").split("/");
                                route = baseUrl.length ? baseUrl[0] : "";
                                // Additional logic to handle permissions can be added here, e.g., checking if the route is in permissions
                                // console.log(info, route, permissions);
                                return [2 /*return*/, true]; // Assuming you'll add permission validation logic here
                            case 2:
                                error_10 = _b.sent();
                                throw new Error(error_10.message ||
                                    "An unexpected error occurred while processing permissions");
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            return RolesService;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _repo_decorators = [(0, injector_1.Inject)(roles_repository_1.RolesRepository, tables_1.roles)];
            __esDecorate(null, null, _repo_decorators, { kind: "field", name: "repo", static: false, private: false, access: { has: function (obj) { return "repo" in obj; }, get: function (obj) { return obj.repo; }, set: function (obj, value) { obj.repo = value; } }, metadata: _metadata }, _repo_initializers, _repo_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RolesService = RolesService;
var templateObject_1, templateObject_2;
