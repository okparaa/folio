import { sql } from "drizzle-orm";
import { Repository } from ".";
import { throwErr } from "../utils/error.utils";

export class UsersRepository extends Repository {
  async getUserByUsername(username: string) {
    if (!username) {
      return throwErr("Username is required");
    }

    try {
      const result = await this.db.execute(
        sql`SELECT * FROM ${this.table} WHERE username = ${username}`
      );

      if (result.rowCount === 0) {
        return throwErr("User not found");
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(
        (error as Error).message ||
          "An error occurred while retrieving the user"
      );
    }
  }
}
