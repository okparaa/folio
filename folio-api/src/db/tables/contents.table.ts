import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from ".";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { createId } from "../create-id";
import { decimal } from "drizzle-orm/pg-core";

export const contents = pgTable("contents", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("contents"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  content: varchar("content"),
  deleted: boolean("deleted").default(false),
  photo: varchar("photo"),
  title: varchar("title"),
  slug: varchar("slug").unique(),
});

export const contentsRelation = relations(contents, ({ many }) => ({
  user: many(users),
}));

export type Contents = InferInsertModel<typeof contents>;
