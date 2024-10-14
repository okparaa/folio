"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
exports.RolesRepository = void 0;
var _1 = require(".");
var drizzle_orm_1 = require("drizzle-orm");
var error_utils_1 = require("../utils/error.utils");
var RolesRepository = /** @class */ (function (_super) {
    __extends(RolesRepository, _super);
    function RolesRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RolesRepository.prototype.addRolePermissions = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data.roleId)
                            return [2 /*return*/, (0, error_utils_1.throwErr)("role id not provided for permissions")];
                        if (!data.permissions.length)
                            return [2 /*return*/, (0, error_utils_1.throwErr)("permissions is required")];
                        return [4 /*yield*/, this.db.transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var results;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    results = [];
                                    data.permissions.forEach(function (permit) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, tx.execute((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      UPDATE roles SET permissions = ARRAY_APPEND(permissions, ", ") where id = ", ""], ["\n      UPDATE roles SET permissions = ARRAY_APPEND(permissions, ", ") where id = ", ""])), permit, data.roleId))];
                                                case 1:
                                                    _a.sent();
                                                    results.push(permit);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/, results];
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RolesRepository.prototype.removeRolePermissions = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data.roleId)
                            return [2 /*return*/, (0, error_utils_1.throwErr)("role id not provided for permissions")];
                        if (!data.permissions.length)
                            return [2 /*return*/, (0, error_utils_1.throwErr)("permissions not provided")];
                        return [4 /*yield*/, this.db.transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var results;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    results = [];
                                    data.permissions.forEach(function (permit) { return __awaiter(_this, void 0, void 0, function () {
                                        var resp;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, tx.execute((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      UPDATE roles SET permissions = ARRAY_REMOVE(permissions, ", ") where id = ", " RETURNING *"], ["\n      UPDATE roles SET permissions = ARRAY_REMOVE(permissions, ", ") where id = ", " RETURNING *"])), permit, data.roleId))];
                                                case 1:
                                                    resp = _a.sent();
                                                    results.push(permit);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/, results];
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RolesRepository.prototype.findByRoleName = function (role) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!role) {
                            return [2 /*return*/, (0, error_utils_1.throwErr)("role name is empty")];
                        }
                        return [4 /*yield*/, this.db.execute((0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        SELECT permissions from ", " where role = ", "; \n        "], ["\n        SELECT permissions from ", " where role = ", "; \n        "])), this.table, role))];
                    case 1:
                        result = _a.sent();
                        if (result.rowCount === 0)
                            return [2 /*return*/, (0, error_utils_1.throwErr)("role does not exist")];
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    return RolesRepository;
}(_1.Repository));
exports.RolesRepository = RolesRepository;
var templateObject_1, templateObject_2, templateObject_3;
