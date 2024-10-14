import { InferSelectModel, sql } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";

export const roles = pgTable("roles", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("roles"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(true),
  role: varchar("role").notNull().unique(),
  permissions: varchar("permissions")
    .array()
    .notNull()
    .default(sql`'{}'::varchar[]`),
  description: varchar("description").notNull(),
});

export type Roles = InferSelectModel<typeof roles>;
