"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewContentSchema = exports.ContentSchema = void 0;
var v = require("valibot");
exports.ContentSchema = v.object({
    id: v.string("id should be a string"),
    name: v.optional(v.string("name should be a string")),
    description: v.optional(v.string()),
    stock: v.optional(v.number("value must be a number")),
    price: v.pipe(v.optional(v.number("price shoud be a number")), v.check(function (input) { return input === undefined || input === null || input > 0; })),
});
exports.NewContentSchema = v.omit(exports.ContentSchema, ["id"]);
