"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const create_id_1 = require("../create-id");
exports.routes = (0, pg_core_1.pgTable)("routes", {
    id: (0, pg_core_1.varchar)("id", { length: 128 })
        .$defaultFn(() => (0, create_id_1.createId)("routes"))
        .primaryKey(),
    syn: (0, pg_core_1.boolean)("syn").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
    status: (0, pg_core_1.boolean)("status").default(true),
    route: (0, pg_core_1.varchar)("route").notNull().unique(),
    slug: (0, pg_core_1.varchar)("slug").notNull().unique(),
    description: (0, pg_core_1.varchar)("description"),
});
