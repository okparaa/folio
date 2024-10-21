import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { roles } from "./roles.table";
import { users } from "./users.table";
import { InferSelectModel } from "drizzle-orm";

export const userRoles = pgTable(
  "users_roles",
  {
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id),
    roleId: varchar("role_id")
      .notNull()
      .references(() => roles.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.roleId] }),
  })
);

export type UserRoles = InferSelectModel<typeof userRoles>;
