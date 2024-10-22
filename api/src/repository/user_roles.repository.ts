import { Repository } from ".";
import { sql } from "drizzle-orm";
import { NotProvidedException } from "../exceptions/notProvided.exception";
import { NotFoundException } from "../exceptions/notFound.exception";
import { ExpectationFailedException } from "../exceptions/expectationFailed.exception";

export class UserRolesRepository extends Repository {
  async getUserRoles(userId: string) {
    if (!userId) {
      throw new NotProvidedException("id is required");
    }

    try {
      const result = await this.db.execute(
        sql`SELECT r.name FROM roles r, JOIN user_roles ur on r.id = ur.user_id WHERE r.id = ${userId}`
      );

      if (result.rowCount === 0) {
        throw new NotFoundException("role name not found");
      }

      return result.rows;
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
