import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./tables";
import dotenv from "dotenv";
dotenv.config();

export const client = new Client({
  connectionString: process.env.DATABASE_TEST_URL,
});

client.connect();

export const db = drizzle(client, { schema, logger: false });
