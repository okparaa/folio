import { db } from "../db";
import { Column, eq } from "drizzle-orm";
import { DbTable } from "../types";

export class Repository {
  table: DbTable;
  db: typeof db;
  constructor(table: DbTable, base: typeof db = db) {
    this.db = base;
    this.table = table;
  }

  async create<D extends {}>(data: D): Promise<unknown> {
    const [result] = await this.db.insert(this.table).values(data).returning();
    return result;
  }
  async update<D extends { id: string }>(data: D): Promise<unknown> {
    const [result] = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, data.id))
      .returning();
    return result;
  }

  async delete(id: string): Promise<unknown> {
    const [result] = await this.db
      .delete(this.table)
      .where(eq(this.table.id, id))
      .returning();
    return result;
  }
  async find(limit: number, offset: number): Promise<unknown> {
    return await this.db.select().from(this.table).limit(limit).offset(offset);
  }
  async findOne(id: string): Promise<unknown> {
    const [result] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));
    return result;
  }
}
