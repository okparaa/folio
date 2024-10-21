import { Repository } from ".";
import { sql } from "drizzle-orm";
import { throwErr } from "../utils/error.utils";

export class UserRolesRepository extends Repository {
  async getUserRoles(userId: string) {
    if (!userId) {
      return throwErr("id is required");
    }

    try {
      const result = await this.db.execute(
        sql`SELECT r.name FROM roles r, JOIN user_roles ur on r.id = ur.user_id WHERE r.id = ${userId}`
      );

      if (result.rowCount === 0) {
        return throwErr("role name not found");
      }

      return result.rows;
    } catch (error) {
      throw new Error(
        (error as Error).message ||
          "An error occurred while retrieving the role names"
      );
    }
  }
}
