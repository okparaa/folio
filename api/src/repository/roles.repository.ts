import { InferInput } from "valibot";
import { Repository } from ".";
import { sql } from "drizzle-orm";
import { throwErr } from "../utils/error.utils";

export class RolesRepository extends Repository {
  async findByRoleName(role: string) {
    if (!role) {
      return throwErr("role name is empty");
    }
    const result = await this.db.execute(sql`
        SELECT permissions from ${this.table} where role = ${role}; 
        `);
    if (result.rowCount === 0) return throwErr("role does not exist");
    return result.rows[0];
  }
}
