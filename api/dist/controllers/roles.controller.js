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
exports.RolesController = void 0;
const injector_1 = require("../decorators/injector");
const roles_schema_1 = require("../schemas/roles.schema");
const roles_service_1 = require("../services/roles.service");
const query_schema_1 = require("../schemas/query.schema");
const validation_util_1 = require("../utils/validation.util");
let RolesController = (() => {
    var _a;
    let _service_decorators;
    let _service_initializers = [];
    let _service_extraInitializers = [];
    return _a = class RolesController {
            createRole(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Asynchronously validate the request body
                        const result = yield (0, validation_util_1.safeParseAsync)(roles_schema_1.NewRolesSchema, req.body, {
                            abortPipeEarly: true,
                        });
                        // Handle validation issues
                        if (result.issues) {
                            return res.status(400).json((0, validation_util_1.flatten)(result.issues));
                        }
                        // Create the role using the validated data
                        const newRole = yield this.service.createRole(result.output);
                        //handle role creation failure
                        if (!newRole) {
                            return res.status(404).json({ message: "Did not return created role" });
                        }
                        // Return the created role
                        return res.status(201).json(newRole);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            getRoles(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Validate the query parameters
                        const query = (0, validation_util_1.safeParse)(query_schema_1.RequestQuerySchema, req.query, {
                            abortPipeEarly: true,
                        });
                        // Handle validation issues
                        if (query.issues) {
                            return res.status(400).json((0, validation_util_1.flatten)(query.issues));
                        }
                        // Parse limit and offset from the validated query
                        const limit = parseInt(query.output.l);
                        const offset = parseInt(query.output.o);
                        // Fetch the roles with the specified limit and offset
                        const roles = yield this.service.getRoles(limit, offset);
                        //if roles was not found
                        if (!roles) {
                            return res
                                .status(404)
                                .json({ message: "Service did not return roles" });
                        }
                        // Return the list of roles
                        return res.status(200).json(roles);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            updateRole(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Asynchronously validate the request body
                        const result = yield (0, validation_util_1.safeParseAsync)(roles_schema_1.OldRolesSchema, req.body, {
                            abortPipeEarly: true,
                        });
                        // Handle validation issues
                        if (result.issues) {
                            return res.status(400).json((0, validation_util_1.flatten)(result.issues));
                        }
                        // Update the role using the validated data
                        const updatedRole = yield this.service.updateRole(result.output);
                        // If the role is not found, return a 404 response
                        if (!updatedRole) {
                            return res
                                .status(404)
                                .json({ message: "Service did not return updated role" });
                        }
                        // Return the updated role
                        return res.status(200).json(updatedRole);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            addRolePermissions(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        //validate the request body and request params
                        const result = (0, validation_util_1.safeParse)(roles_schema_1.RolesPermitsSchema, Object.assign(Object.assign({}, req.body), { id: req.params.id }), { abortPipeEarly: true });
                        //handle validation issues
                        if (result.issues) {
                            return res.status(400).json((0, validation_util_1.flatten)(result.issues));
                        }
                        //add the permission to the role using the validated input
                        const response = yield this.service.addRolePermissions(result.output);
                        //if the role for the permisions is not found, return 404
                        if (!response) {
                            return res
                                .status(404)
                                .json({ message: "Added permissions not returned" });
                        }
                        //return the response
                        return res.status(200).json(response);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            delRolePermisions(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        //validate the request body and request params
                        const result = (0, validation_util_1.safeParse)(roles_schema_1.RolesPermitsSchema, Object.assign(Object.assign({}, req.body), { id: req.params.id }), { abortPipeEarly: true });
                        //handle the validation issues
                        if (result.issues) {
                            return res.status(400).json((0, validation_util_1.flatten)(result.issues));
                        }
                        //delete the permission from the role
                        const response = yield this.service.delRolePermissions(result.output);
                        //if the role for the permissions is not found, return 404
                        if (!response) {
                            return res
                                .status(404)
                                .json({ message: "Deleted permissions not returned" });
                        }
                        //return the response
                        return res.status(200).json(response);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            getRole(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        //get the id from the request params
                        const id = req.params.id;
                        //if id not provided, return 400
                        if (!id) {
                            return res.status(400).json({ message: "ID is not specified" });
                        }
                        //get role with the given id
                        const response = yield this.service.getRole(id);
                        //if role is not found
                        if (!response) {
                            return res.status(404).json({ message: "role not found" });
                        }
                        //return the role response
                        return res.status(200).json(response);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            deleteRole(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    //always return forbidden status 403
                    return res.status(403).json({ message: "Role deletion is forbidden" });
                });
            }
            constructor() {
                this.service = __runInitializers(this, _service_initializers, void 0);
                __runInitializers(this, _service_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _service_decorators = [(0, injector_1.Inject)(roles_service_1.RolesService)];
            __esDecorate(null, null, _service_decorators, { kind: "field", name: "service", static: false, private: false, access: { has: obj => "service" in obj, get: obj => obj.service, set: (obj, value) => { obj.service = value; } }, metadata: _metadata }, _service_initializers, _service_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.RolesController = RolesController;
