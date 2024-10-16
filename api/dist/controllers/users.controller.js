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
exports.UsersController = void 0;
const validation_util_1 = require("../utils/validation.util");
const users_schema_1 = require("../schemas/users.schema");
const users_service_1 = require("../services/users.service");
const injector_1 = require("../decorators/injector");
const query_schema_1 = require("../schemas/query.schema");
let UsersController = (() => {
    var _a;
    let _service_decorators;
    let _service_initializers = [];
    let _service_extraInitializers = [];
    return _a = class UsersController {
            signup(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Validate the request body against the schema
                        const result = yield (0, validation_util_1.safeParseAsync)(users_schema_1.SignupSchema, req.body, {
                            abortPipeEarly: true,
                        });
                        // Handle validation errors
                        if (result.issues) {
                            const flattenedIssues = (0, validation_util_1.flatten)(result.issues);
                            return res.status(400).json(flattenedIssues); // Bad request with validation issues
                        }
                        // Proceed with signup service
                        const response = (yield this.service.signup(result.output));
                        if (!(response === null || response === void 0 ? void 0 : response.id))
                            return res.status(405).json({ message: "Registration failed" });
                        // Respond with a success status
                        return res.status(201).json(response);
                    }
                    catch (error) {
                        // Handle unexpected errors and return a generic error message
                        return res
                            .status(500)
                            .json({ message: error.message || "Internal Server Error" });
                    }
                });
            }
            signin(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Validate the request body against the schema
                        const result = yield (0, validation_util_1.safeParseAsync)(users_schema_1.SigninSchema, req.body, {
                            abortPipeEarly: true,
                        });
                        // Handle validation errors
                        if (result.issues) {
                            return res.status(400).json((0, validation_util_1.flatten)(result.issues)); // Return bad request with validation issues
                        }
                        // Generate user tokens
                        const tokenUser = yield this.service.createTokens(result.output.username);
                        // Handle token generation failure
                        if (!tokenUser) {
                            return res
                                .status(404)
                                .json({ message: "Could not create user and token" });
                        }
                        const { refreshToken, currentUser } = tokenUser;
                        if (!refreshToken) {
                            return res.status(404).json({ message: "Could not create token" });
                        }
                        // Destructure and set cookie with refresh token
                        res.cookie("refreshToken", refreshToken, {
                            httpOnly: true,
                            secure: true, // Ensures cookies are only sent over HTTPS
                        });
                        // Respond with the current user object
                        return res.status(200).json(currentUser);
                    }
                    catch (error) {
                        // Handle unexpected errors
                        return res
                            .status(500)
                            .json({ message: error.message || "Internal Server Error" });
                    }
                });
            }
            getUsers(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const { query } = req;
                        const result = (0, validation_util_1.safeParse)(query_schema_1.RequestQuerySchema, query);
                        // Handling validation issues
                        if (result.issues) {
                            return res.status(400).json((0, validation_util_1.flatten)(result.issues));
                        }
                        // Convert to integers and handle NaN cases by providing default values
                        const limit = parseInt(result.output.l);
                        const offset = parseInt(result.output.o);
                        // Fetch users based on the parsed limit and offset
                        const users = yield this.service.getUsers(limit, offset);
                        //return 404 if service did not return users
                        if (!users || !Array.isArray(users)) {
                            return res
                                .status(404)
                                .json({ message: "Service returned invalid users" });
                        }
                        //return the users
                        return res.status(200).json(users);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            getUser(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const { id } = req.params;
                        // Check if ID is provided
                        if (!id) {
                            return res.status(400).json({ message: "ID is not provided" });
                        }
                        // Fetch the user from the service
                        const user = yield this.service.getUser(id);
                        // If the user does not exist, return a 404 status
                        if (!user) {
                            return res.status(404).json({ message: "User not found" });
                        }
                        // Return the user details
                        return res.status(200).json(user);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            updateUser(req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Parse the request body using the schema
                        const result = (0, validation_util_1.safeParse)(users_schema_1.UsersSchema, req.body, {
                            abortPipeEarly: true,
                        });
                        // Handle validation issues
                        if (result.issues) {
                            return res.status(400).json((0, validation_util_1.flatten)(result.issues));
                        }
                        // Update the user with the validated data
                        const updatedUser = yield this.service.updateUser(result.output);
                        // If the user is not found, return a 404 response
                        if (!updatedUser) {
                            return res.status(404).json({ message: "User not found" });
                        }
                        // Return the updated user
                        return res.status(200).json(updatedUser);
                    }
                    catch (error) {
                        return res.status(500).json({
                            message: error instanceof Error ? error.message : "Internal Server Error",
                        });
                    }
                });
            }
            constructor() {
                this.service = __runInitializers(this, _service_initializers, void 0);
                __runInitializers(this, _service_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _service_decorators = [(0, injector_1.Inject)(users_service_1.UsersService)];
            __esDecorate(null, null, _service_decorators, { kind: "field", name: "service", static: false, private: false, access: { has: obj => "service" in obj, get: obj => obj.service, set: (obj, value) => { obj.service = value; } }, metadata: _metadata }, _service_initializers, _service_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UsersController = UsersController;
