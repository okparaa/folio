"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var pg_core_1 = require("drizzle-orm/pg-core");
var create_id_1 = require("../create-id");
exports.roles = (0, pg_core_1.pgTable)("roles", {
    id: (0, pg_core_1.varchar)("id", { length: 128 })
        .$defaultFn(function () { return (0, create_id_1.createId)("roles"); })
        .primaryKey(),
    syn: (0, pg_core_1.boolean)("syn").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .defaultNow()
        .$onUpdate(function () { return new Date(); }),
    status: (0, pg_core_1.boolean)("status").default(true),
    role: (0, pg_core_1.varchar)("role").notNull().unique(),
    permissions: (0, pg_core_1.varchar)("permissions")
        .array()
        .notNull()
        .default((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["'{}'::varchar[]"], ["'{}'::varchar[]"])))),
    description: (0, pg_core_1.varchar)("description").notNull(),
});
var templateObject_1;
