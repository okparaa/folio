"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRelation = exports.sessions = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var _1 = require(".");
var drizzle_orm_1 = require("drizzle-orm");
var create_id_1 = require("../create-id");
exports.sessions = (0, pg_core_1.pgTable)("sessions", {
    id: (0, pg_core_1.varchar)("id", { length: 128 })
        .$defaultFn(function () { return (0, create_id_1.createId)("sessions"); })
        .primaryKey(),
    active: (0, pg_core_1.boolean)("active").default(true),
    refreshToken: (0, pg_core_1.varchar)("refresh_token"),
    accessToken: (0, pg_core_1.varchar)("access_token"),
    kode: (0, pg_core_1.varchar)("kode", { length: 12 }),
    syn: (0, pg_core_1.boolean)("syn").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .defaultNow()
        .$onUpdate(function () { return new Date(); }),
    deleted: (0, pg_core_1.boolean)("deleted").default(false),
    userId: (0, pg_core_1.varchar)("user_id").references(function () { return _1.users.id; }),
});
exports.sessionRelation = (0, drizzle_orm_1.relations)(exports.sessions, function (_a) {
    var one = _a.one;
    return ({
        user: one(_1.users, {
            fields: [exports.sessions.userId],
            references: [_1.users.id],
        }),
    });
});
