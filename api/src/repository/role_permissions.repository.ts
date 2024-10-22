import { Repository } from ".";
import { sql } from "drizzle-orm";
import { NotProvidedException } from "../exceptions/notProvided.exception";
import { ExpectationFailedException } from "../exceptions/expectationFailed.exception";

export class RolePermissionsRepository extends Repository {
  async getUserRolePermissions(userId: string) {
    if (!userId) {
      throw new NotProvidedException("user id is required");
    }

    try {
      const result = await this.db.execute(
        sql`SELECT p.name 
            FROM permissions p 
            JOIN role_permissions rp ON p.id = rp.permission_id 
            JOIN roles r ON r.id = rp.role_id 
            WHERE r.name = ANY (
                SELECT r.name FROM roles r, JOIN user_roles ur on r.id = ur.user_id WHERE r.id = ${userId}
            )`
      );

      return result.rows;
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
