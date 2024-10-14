"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestQuerySchema = void 0;
var v = require("valibot");
exports.RequestQuerySchema = v.object({
    l: v.optional(v.string(), "100"),
    o: v.optional(v.string(), "0"),
});
