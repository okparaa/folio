"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelation = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const create_id_1 = require("../create-id");
const sessions_table_1 = require("./sessions.table");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.varchar)("id", { length: 128 })
        .$defaultFn(() => (0, create_id_1.createId)("users"))
        .primaryKey(),
    surname: (0, pg_core_1.varchar)("surname", { length: 60 }).notNull(),
    username: (0, pg_core_1.varchar)("username", { length: 60 }).notNull().unique(),
    firstname: (0, pg_core_1.varchar)("firstname", { length: 60 }).notNull(),
    lastname: (0, pg_core_1.varchar)("lastname", { length: 60 }),
    phone: (0, pg_core_1.varchar)("phone", { length: 30 }).notNull().unique(),
    photoUrl: (0, pg_core_1.varchar)("photo_url"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
    status: (0, pg_core_1.boolean)("status").default(true),
    password: (0, pg_core_1.varchar)("password", { length: 60 }).notNull(),
    role: (0, pg_core_1.varchar)("role").default("user").notNull(),
});
exports.userRelation = (0, drizzle_orm_1.relations)(exports.users, ({ many, one }) => ({
    session: many(sessions_table_1.sessions),
}));
