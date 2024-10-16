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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const tables_1 = require("../db/tables");
const injector_1 = require("../decorators/injector");
const roles_repository_1 = require("../repository/roles.repository");
const error_utils_1 = require("../utils/error.utils");
let RolesService = (() => {
    var _a;
    let _repo_decorators;
    let _repo_initializers = [];
    let _repo_extraInitializers = [];
    return _a = class RolesService {
            createRole(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = (yield this.repo.create(data));
                        if (!result || !result.id) {
                            return (0, error_utils_1.throwErr)("Could not create role");
                        }
                        return result;
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message ||
                            "An unexpected error occurred while creating the role");
                    }
                });
            }
            updateRole(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = (yield this.repo.update(data));
                        if (!result || !result.id) {
                            return (0, error_utils_1.throwErr)("Could not update role");
                        }
                        return result;
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message ||
                            "An unexpected error occurred while updating the role");
                    }
                });
            }
            getRoles(limit, offset) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield this.repo.find(limit, offset);
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message ||
                            "An unexpected error occurred while getting the roles");
                    }
                });
            }
            getRole(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const role = yield this.repo.findOne(id);
                        if (!role) {
                            return (0, error_utils_1.throwErr)(`Role with id ${id} not found`);
                        }
                        return role;
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message ||
                            "An unexpected error occurred while getting the role");
                    }
                });
            }
            addRolePermissions(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // First, delete exsting role permissions
                        yield this.delRolePermissions(data);
                        // Then, add new rol permissions
                        return (yield this.repo.addRolePermissions(data));
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message ||
                            "An unexpected error occurred while getting the roles");
                    }
                });
            }
            delRolePermissions(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield this.repo.removeRolePermissions(data);
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message ||
                            "An unexpected error occurred while getting the roles");
                    }
                });
            }
            patchRole(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const role = (yield this.repo.update(data));
                        if (!role || !role.id) {
                            return (0, error_utils_1.throwErr)(`Failed to update role with id ${data.id}`);
                        }
                        return role;
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message ||
                            "An unexpected error occurred while getting the roles");
                    }
                });
            }
            notDuplicate(name) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = yield this.repo.db.execute((0, drizzle_orm_1.sql) `SELECT * FROM ${this.repo.table} WHERE name = ${name} `);
                        return result.rowCount == 0 ? true : false;
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message ||
                            "An unexpected error occurred while getting the roles");
                    }
                });
            }
            isSameRole(input) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = yield this.repo.db.execute((0, drizzle_orm_1.sql) `SELECT * FROM ${this.repo.table} WHERE name = ${input.role}`);
                        if (result.rowCount && result.rows[0].id !== input.id) {
                            return false; //another role with name exist
                        }
                        return true;
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message ||
                            "An unexpected error occurred while getting the roles");
                    }
                });
            }
            /**
             * routeId.crud,routeId.crud
             * @param data
             * @param user
             */
            isAllowed(info, user) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const permissions = yield this.repo.findByRoleName(user.role);
                        // Clean up the baseUrl and extract the first part as the route
                        const baseUrl = info.baseUrl.replace(/(^\/|\/$)/g, "").split("/");
                        const route = baseUrl.length ? baseUrl[0] : "";
                        // Additional logic to handle permissions can be added here, e.g., checking if the route is in permissions
                        // console.log(info, route, permissions);
                        return true; // Assuming you'll add permission validation logic here
                    }
                    catch (error) {
                        throw new Error(error.message ||
                            "An unexpected error occurred while processing permissions");
                    }
                });
            }
            constructor() {
                this.repo = __runInitializers(this, _repo_initializers, void 0);
                __runInitializers(this, _repo_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _repo_decorators = [(0, injector_1.Inject)(roles_repository_1.RolesRepository, tables_1.roles)];
            __esDecorate(null, null, _repo_decorators, { kind: "field", name: "repo", static: false, private: false, access: { has: obj => "repo" in obj, get: obj => obj.repo, set: (obj, value) => { obj.repo = value; } }, metadata: _metadata }, _repo_initializers, _repo_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.RolesService = RolesService;
