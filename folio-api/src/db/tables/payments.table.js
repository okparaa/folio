"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payments = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var create_id_1 = require("../create-id");
exports.payments = (0, pg_core_1.pgTable)("payments", {
    id: (0, pg_core_1.varchar)("id", { length: 128 })
        .$defaultFn(function () { return (0, create_id_1.createId)("payments"); })
        .primaryKey(),
    syn: (0, pg_core_1.boolean)("syn").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .defaultNow()
        .$onUpdate(function () { return new Date(); }),
    deleted: (0, pg_core_1.boolean)("deleted").default(false),
    status: (0, pg_core_1.boolean)("status").default(false),
    reference: (0, pg_core_1.varchar)("reference"),
    authorizationUrl: (0, pg_core_1.varchar)("authorization_url"),
    accessCode: (0, pg_core_1.varchar)("access_code"),
    message: (0, pg_core_1.varchar)("message"),
    userId: (0, pg_core_1.varchar)("user_id"),
});
