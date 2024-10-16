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
exports.RoutesController = void 0;
const injector_1 = require("../decorators/injector");
const routes_schema_1 = require("../schemas/routes.schema");
const routes_service_1 = require("../services/routes.service");
const query_schema_1 = require("../schemas/query.schema");
const validation_util_1 = require("../utils/validation.util");
let RoutesController = (() => {
    var _a;
    let _service_decorators;
    let _service_initializers = [];
    let _service_extraInitializers = [];
    return _a = class RoutesController {
            createRoute(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // validate request body
                        const result = yield (0, validation_util_1.safeParseAsync)(routes_schema_1.NewRoutesSchema, req.body, {
                            abortPipeEarly: true,
                        });
                        //handle validation issues
                        if (result.issues) {
                            return res.status(400).json((0, validation_util_1.flatten)(result.issues));
                        }
                        //create the role with the validated data
                        const response = yield this.service.createRoute(result.output);
                        //return 404 if create route is not returned
                        if (!response) {
                            return res
                                .status(404)
                                .json({ message: "Service did not return created route" });
                        }
                        //return the created route as response
                        return res.status(201).json(response);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            getRoutes(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        //validate the request query using the defined schema
                        const query = (0, validation_util_1.safeParse)(query_schema_1.RequestQuerySchema, req.query, {
                            abortPipeEarly: true,
                        });
                        //handle validation issued
                        if (query.issues) {
                            return res.status(400).json((0, validation_util_1.flatten)(query.issues));
                        }
                        //get the limit and offset from the validated data
                        const limit = parseInt(query.output.l);
                        const offset = parseInt(query.output.o);
                        //get the routes using the limit and offset
                        const response = yield this.service.getRoutes(limit, offset);
                        //return 404 if the routes are not returned by the service
                        if (!response || !Array.isArray(response)) {
                            return res
                                .status(404)
                                .json({ message: "Service did not return routes" });
                        }
                        //return routes
                        return res.status(200).json(response);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            updateRoute(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        //asynchronously validate the request body using the defined schema
                        const result = yield (0, validation_util_1.safeParseAsync)(routes_schema_1.OldRoutesSchema, req.body, {
                            abortPipeEarly: true,
                        });
                        //handle the validation issues
                        if (result.issues) {
                            return res.status(400).json((0, validation_util_1.flatten)(result.issues));
                        }
                        //update the route with the validated data
                        const response = yield this.service.updateRoute(result.output);
                        //return 404 if validated route is not returned
                        if (!response) {
                            return res
                                .status(404)
                                .json({ message: "Service did not return updated route" });
                        }
                        //return the route as response
                        return res.status(200).json(response);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            getRoute(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        //get the id from the request params
                        const id = req.params.id;
                        //return 400 if id is not provided
                        if (!id) {
                            return res.status(400).json({ message: "ID is not valid" });
                        }
                        //get the route using the id
                        const response = yield this.service.getRoute(id);
                        //return 404 if route does not exist
                        if (!response) {
                            return res.status(404).json("Route does not exist");
                        }
                        //return the route as response
                        return res.status(200).json(response);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            delete(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    //always return 403 forbidden
                    return res.status(403).json({ message: "Deletion of route is forbidden" });
                });
            }
            constructor() {
                this.service = __runInitializers(this, _service_initializers, void 0);
                __runInitializers(this, _service_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _service_decorators = [(0, injector_1.Inject)(routes_service_1.RoutesService)];
            __esDecorate(null, null, _service_decorators, { kind: "field", name: "service", static: false, private: false, access: { has: obj => "service" in obj, get: obj => obj.service, set: (obj, value) => { obj.service = value; } }, metadata: _metadata }, _service_initializers, _service_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.RoutesController = RoutesController;
