import { InferInsertModel } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";

export const routes = pgTable("routes", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("routes"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(true),
  route: varchar("route").notNull().unique(),
  slug: varchar("slug").notNull().unique(),
  description: varchar("description"),
});

export type Routes = InferInsertModel<typeof routes>;
