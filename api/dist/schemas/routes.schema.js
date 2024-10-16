"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.OldRoutesSchema = exports.NewRoutesSchema = void 0;
const v = __importStar(require("valibot"));
const routes_service_1 = require("../services/routes.service");
const routesService = new routes_service_1.RoutesService();
exports.NewRoutesSchema = v.objectAsync({
    route: v.pipeAsync(v.string("route not string"), v.maxLength(30, "route too long"), v.nonEmpty("route empty"), v.regex(/\w{2,6}:\w{1,20}$/, "bad format (get:users/xyz)"), v.checkAsync((route) => __awaiter(void 0, void 0, void 0, function* () {
        return yield routesService.noRoutePair(route);
    }), "route exists")),
    slug: v.pipeAsync(v.string("should be string"), v.nonEmpty("value is required"), v.checkAsync((slug) => __awaiter(void 0, void 0, void 0, function* () {
        return yield routesService.noSlugPair(slug);
    }), "slug exists")),
    description: v.pipe(v.string("route desc not string"), v.nonEmpty("route desc empty")),
});
exports.OldRoutesSchema = v.object({
    id: v.string(),
    route: v.pipe(v.string("route not string"), v.maxLength(12, "route too long"), v.nonEmpty("route empty"), v.regex(/\w{2,6}:\w{1,20}$/, "e.g: -> get:ijk/xyz")),
    slug: v.pipe(v.string("should be string"), v.nonEmpty("value is required")),
    description: v.pipe(v.string("route desc not string"), v.nonEmpty("route desc empty")),
});
