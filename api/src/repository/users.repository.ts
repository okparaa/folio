import { sql } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "../exceptions/notProvided.exception";
import { NotFoundException } from "../exceptions/notFound.exception";
import { Users } from "../db/tables";
import { ExpectationFailedException } from "../exceptions/expectationFailed.exception";

export class UsersRepository extends Repository {
  async getUserByUsername(username: string) {
    if (!username) {
      throw new NotProvidedException("Username is required");
    }

    try {
      const result = await this.db.execute(
        sql`SELECT * FROM ${this.table} WHERE username = ${username}`
      );

      if (result.rowCount === 0) {
        throw new NotFoundException("User not found");
      }

      return result.rows[0] as Users;
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
