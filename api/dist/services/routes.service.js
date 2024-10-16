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
exports.RoutesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const tables_1 = require("../db/tables");
const injector_1 = require("../decorators/injector");
const routes_repository_1 = require("../repository/routes.repository");
const error_utils_1 = require("../utils/error.utils");
let RoutesService = (() => {
    var _a;
    let _repo_decorators;
    let _repo_initializers = [];
    let _repo_extraInitializers = [];
    return _a = class RoutesService {
            createRoute(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    const route = (yield this.repo.create(data));
                    if (!route.id) {
                        return (0, error_utils_1.throwErr)("could not create route");
                    }
                    return route;
                });
            }
            getRoutes(limit, offset) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield this.repo.find(limit, offset);
                });
            }
            getRoute(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield this.repo.findOne(id);
                });
            }
            updateRoute(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    const route = (yield this.repo.update(data));
                    if (!route.id) {
                        return (0, error_utils_1.throwErr)("could not update route");
                    }
                    return route;
                });
            }
            noRoutePair(name) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield this.repo.db.execute((0, drizzle_orm_1.sql) `SELECT * FROM ${this.repo.table} WHERE route = ${name}`);
                    return result.rowCount == 0 ? true : false;
                });
            }
            noSlugPair(name) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield this.repo.db.execute((0, drizzle_orm_1.sql) `SELECT * FROM ${this.repo.table} WHERE slug = ${name}`);
                    return result.rowCount == 0 ? true : false;
                });
            }
            constructor() {
                this.repo = __runInitializers(this, _repo_initializers, void 0);
                __runInitializers(this, _repo_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _repo_decorators = [(0, injector_1.Inject)(routes_repository_1.RoutesRepository, tables_1.routes)];
            __esDecorate(null, null, _repo_decorators, { kind: "field", name: "repo", static: false, private: false, access: { has: obj => "repo" in obj, get: obj => obj.repo, set: (obj, value) => { obj.repo = value; } }, metadata: _metadata }, _repo_initializers, _repo_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.RoutesService = RoutesService;
