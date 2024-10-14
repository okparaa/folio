"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentsRelation = exports.contents = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var _1 = require(".");
var drizzle_orm_1 = require("drizzle-orm");
var create_id_1 = require("../create-id");
exports.contents = (0, pg_core_1.pgTable)("contents", {
    id: (0, pg_core_1.varchar)("id", { length: 128 })
        .$defaultFn(function () { return (0, create_id_1.createId)("contents"); })
        .primaryKey(),
    syn: (0, pg_core_1.boolean)("syn").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .defaultNow()
        .$onUpdate(function () { return new Date(); }),
    content: (0, pg_core_1.varchar)("content"),
    deleted: (0, pg_core_1.boolean)("deleted").default(false),
    photo: (0, pg_core_1.varchar)("photo"),
    title: (0, pg_core_1.varchar)("title"),
    slug: (0, pg_core_1.varchar)("slug").unique(),
});
exports.contentsRelation = (0, drizzle_orm_1.relations)(exports.contents, function (_a) {
    var many = _a.many;
    return ({
        user: many(_1.users),
    });
});
