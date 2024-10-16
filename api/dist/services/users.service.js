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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const tables_1 = require("../db/tables");
const injector_1 = require("../decorators/injector");
const users_repository_1 = require("../repository/users.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const drizzle_orm_1 = require("drizzle-orm");
const error_utils_1 = require("../utils/error.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UsersService = (() => {
    var _a;
    let _repo_decorators;
    let _repo_initializers = [];
    let _repo_extraInitializers = [];
    return _a = class UsersService {
            signup(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Ensure passwords match
                        if (data.pass !== data.password) {
                            return (0, error_utils_1.throwErr)("Passwords do not match");
                        }
                        // Validate required fields
                        if (!data.username || !data.password) {
                            return (0, error_utils_1.throwErr)("Username or password not provided");
                        }
                        // Hash the password securely with bcrypt
                        const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10); // Consider a stronger salt round, like 10
                        // Create the user in the database
                        const { pass } = data, createdUser = __rest(data, ["pass"]);
                        const user = (yield this.repo.create(Object.assign(Object.assign({}, createdUser), { password: hashedPassword })));
                        // Ensure the user was created successfully
                        if (!(user === null || user === void 0 ? void 0 : user.id)) {
                            return (0, error_utils_1.throwErr)("User creation failed");
                        }
                        // Return the created user
                        return user;
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message || "An unexpected error occurred");
                    }
                });
            }
            createTokens(username) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const user = (yield this.repo.getUserByUsername(username));
                        if (!user.id) {
                            throw new Error("User not found");
                        }
                        // Ensure TOKEN_SECRET and REFRESH_SECRET exist
                        const accessTokenSecret = process.env.TOKEN_SECRET;
                        const refreshTokenSecret = process.env.REFRESH_SECRET;
                        if (!accessTokenSecret || !refreshTokenSecret) {
                            return (0, error_utils_1.throwErr)("Token secrets are not defined in environment variables");
                        }
                        const accessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, accessTokenSecret, { expiresIn: "4h", algorithm: "HS256" });
                        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, refreshTokenSecret, { expiresIn: "7d" } // Refresh token expiry is usually longer than access token
                        );
                        const { password, role } = user, rest = __rest(user, ["password", "role"]);
                        const currentUser = Object.assign(Object.assign({}, rest), { accessToken });
                        return { currentUser, refreshToken };
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message || "An unexpected error occurred");
                    }
                });
            }
            updateUser(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Update the user and type-cast to handle optional password
                        const user = (yield this.repo.update(data));
                        // Destructure to exclude the password field from the returned object
                        // Return the updated user data without the password
                        return user;
                    }
                    catch (error) {
                        // Handle potential errors such as update failure
                        return (0, error_utils_1.throwErr)(error.message || "An unexpected error occurred");
                    }
                });
            }
            getUsers(limit, offset) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Basic validation for limit and offset
                    try {
                        if (limit <= 0)
                            return (0, error_utils_1.throwErr)("Limit must be greater than 0");
                        if (offset < 0)
                            return (0, error_utils_1.throwErr)("Offset cannot be negative");
                        return yield this.repo.find(limit, offset);
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message || "An unexpected error occurred");
                    }
                });
            }
            getUser(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (!id)
                            return (0, error_utils_1.throwErr)("id is required");
                        return yield this.repo.findOne(id);
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message || "An unexpected error occurred");
                    }
                });
            }
            verifyUser(input) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const user = (yield this.repo.getUserByUsername(input.username));
                        // Check if user exists
                        const userExists = !!(user && user.id);
                        // Always perform both checks to avoid timing attacks
                        const passwordMatch = userExists
                            ? yield bcryptjs_1.default.compare(input.password, user.password)
                            : false;
                        return userExists && passwordMatch;
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message || "An unexpected error occurred");
                    }
                });
            }
            isUsernameAvailable(username) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (!username)
                            return (0, error_utils_1.throwErr)("username is required");
                        const result = yield this.repo.db.execute((0, drizzle_orm_1.sql) `SELECT 1 FROM ${this.repo.table} WHERE username = ${username} LIMIT 1`);
                        return result.rowCount == 0; // Return true if no rows found, else false
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message || "An unexpected error occurred");
                    }
                });
            }
            isPhoneAvailable(phone) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (!phone)
                            return (0, error_utils_1.throwErr)("phone is required");
                        const result = yield this.repo.db.execute((0, drizzle_orm_1.sql) `SELECT 1 FROM ${this.repo.table} WHERE phone = ${phone} LIMIT 1`);
                        return result.rowCount == 0; // Return true if no rows found, else false
                    }
                    catch (error) {
                        return (0, error_utils_1.throwErr)(error.message || "An unexpected error occurred");
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
            _repo_decorators = [(0, injector_1.Inject)(users_repository_1.UsersRepository, tables_1.users)];
            __esDecorate(null, null, _repo_decorators, { kind: "field", name: "repo", static: false, private: false, access: { has: obj => "repo" in obj, get: obj => obj.repo, set: (obj, value) => { obj.repo = value; } }, metadata: _metadata }, _repo_initializers, _repo_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UsersService = UsersService;
