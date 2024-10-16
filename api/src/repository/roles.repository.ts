import { InferInput } from "valibot";
import { Repository } from ".";
import { sql } from "drizzle-orm";
import { RolesPermitsSchema } from "../schemas/roles.schema";
import { throwErr } from "../utils/error.utils";

export class RolesRepository extends Repository {
  async addRolePermissions(data: InferInput<typeof RolesPermitsSchema>) {
    if (!data.roleId) return throwErr("role id not provided for permissions");
    if (!data.permissions.length) return throwErr("permissions is required");

    return await this.db.transaction(async (tx) => {
      const results: string[] = [];
      data.permissions.forEach(async (permit) => {
        await tx.execute(sql`
      UPDATE roles SET permissions = ARRAY_APPEND(permissions, ${permit}) where id = ${data.roleId}`);
        results.push(permit);
      });
      return results;
    });
  }

  async removeRolePermissions(data: InferInput<typeof RolesPermitsSchema>) {
    if (!data.roleId) return throwErr("role id not provided for permissions");

    if (!data.permissions.length) return throwErr("permissions not provided");

    return await this.db.transaction(async (tx) => {
      const results: string[] = [];
      data.permissions.forEach(async (permit) => {
        const resp = await tx.execute(sql`
      UPDATE roles SET permissions = ARRAY_REMOVE(permissions, ${permit}) where id = ${data.roleId} RETURNING *`);
        results.push(permit);
      });
      return results;
    });
  }

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
