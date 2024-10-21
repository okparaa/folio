import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { roles } from "./roles.table";
import { permissions } from "./permissions.table";
import { InferSelectModel } from "drizzle-orm";

export const rolePermissions = pgTable(
  "roles_permissions",
  {
    roleId: varchar("role_id")
      .notNull()
      .references(() => roles.id),
    permissionId: varchar("permission_id")
      .notNull()
      .references(() => permissions.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.permissionId, t.roleId] }),
  })
);

export type RolePermissions = InferSelectModel<typeof rolePermissions>;
