import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { createId } from "../create-id";

export const users = pgTable("users", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("users"))
    .primaryKey(),
  surname: varchar("surname", { length: 60 }).notNull(),
  username: varchar("username", { length: 60 }).notNull().unique(),
  firstname: varchar("firstname", { length: 60 }).notNull(),
  lastname: varchar("lastname", { length: 60 }),
  phone: varchar("phone", { length: 30 }).notNull().unique(),
  photoUrl: varchar("photo_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(true),
  password: varchar("password", { length: 60 }).notNull(),
  role: varchar("role").default("user").notNull(),
});

export type Users = InferSelectModel<typeof users>;
