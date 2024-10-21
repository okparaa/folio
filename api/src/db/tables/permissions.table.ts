import { InferInsertModel } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";

export const permissions = pgTable("permissions", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("permissions"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(true),
  name: varchar("name").notNull().unique(),
  description: varchar("description"),
});

export type Permissions = InferInsertModel<typeof permissions>;
