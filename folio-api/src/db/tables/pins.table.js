"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pins = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var create_id_1 = require("../create-id");
exports.pins = (0, pg_core_1.pgTable)("pins", {
    id: (0, pg_core_1.varchar)("id", { length: 128 })
        .$defaultFn(function () { return (0, create_id_1.createId)("pins"); })
        .primaryKey(),
    syn: (0, pg_core_1.boolean)("syn").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .defaultNow()
        .$onUpdate(function () { return new Date(); }),
    status: (0, pg_core_1.boolean)("status"),
    pin: (0, pg_core_1.varchar)("pin"),
});
