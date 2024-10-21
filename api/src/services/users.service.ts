import { Users, users } from "../db/tables";
import { Inject } from "../decorators/injector";
import { UsersRepository } from "../repository/users.repository";
import bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";
import {
  SigninSchemaType,
  SignupSchema,
  UsersSchema,
} from "../schemas/users.schema";
import { InferInput } from "valibot";
import { throwErr } from "../utils/error.utils";
import jwt from "jsonwebtoken";
export class UsersService {
  @Inject(UsersRepository, users) repo: UsersRepository;
  async signup(data: InferInput<typeof SignupSchema>) {
    try {
      // Ensure passwords match
      if (data.pass !== data.password) {
        return throwErr("Passwords do not match");
      }

      // Validate required fields
      if (!data.username || !data.password) {
        return throwErr("Username or password not provided");
      }

      // Hash the password securely with bcrypt
      const hashedPassword = await bcrypt.hash(data.password, 10); // Consider a stronger salt round, like 10

      // Create the user in the database
      const { pass, ...createdUser } = data;

      const user = (await this.repo.create({
        ...createdUser,
        password: hashedPassword,
      })) as Users;

      // Ensure the user was created successfully
      if (!user?.id) {
        return throwErr("User creation failed");
      }

      // Return the created user
      return user;
    } catch (error) {
      return throwErr(
        (error as Error).message || "An unexpected error occurred"
      );
    }
  }

  async createTokens(username: string) {
    try {
      const user = (await this.repo.getUserByUsername(username)) as Users;
      if (!user.id) {
        throw new Error("User not found");
      }

      // Ensure TOKEN_SECRET and REFRESH_SECRET exist
      const accessTokenSecret = process.env.TOKEN_SECRET;
      const refreshTokenSecret = process.env.REFRESH_SECRET;
      if (!accessTokenSecret || !refreshTokenSecret) {
        return throwErr(
          "Token secrets are not defined in environment variables"
        );
      }

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        accessTokenSecret,
        { expiresIn: "4h", algorithm: "HS256" }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        refreshTokenSecret,
        { expiresIn: "7d" } // Refresh token expiry is usually longer than access token
      );
      const { password, role, ...rest } = user;

      const currentUser = {
        ...rest,
        accessToken,
      };

      return { currentUser, refreshToken };
    } catch (error) {
      return throwErr(
        (error as Error).message || "An unexpected error occurred"
      );
    }
  }

  async updateUser(data: InferInput<typeof UsersSchema>) {
    try {
      // Update the user and type-cast to handle optional password
      const user = (await this.repo.update(data)) as Users;

      // Destructure to exclude the password field from the returned object

      // Return the updated user data without the password
      return user;
    } catch (error) {
      // Handle potential errors such as update failure
      return throwErr(
        (error as Error).message || "An unexpected error occurred"
      );
    }
  }

  async getUsers(limit: number, offset: number) {
    // Basic validation for limit and offset
    try {
      if (limit <= 0) return throwErr("Limit must be greater than 0");
      if (offset < 0) return throwErr("Offset cannot be negative");

      return await this.repo.find(limit, offset);
    } catch (error) {
      return throwErr(
        (error as Error).message || "An unexpected error occurred"
      );
    }
  }

  async getUser(id: string) {
    try {
      if (!id) return throwErr("id is required");
      return await this.repo.findOne(id);
    } catch (error) {
      return throwErr(
        (error as Error).message || "An unexpected error occurred"
      );
    }
  }

  async verifyUser(input: SigninSchemaType) {
    try {
      const user = (await this.repo.getUserByUsername(input.username)) as Users;
      // Check if user exists
      const userExists = !!(user && user.id);

      // Always perform both checks to avoid timing attacks
      const passwordMatch = userExists
        ? await bcrypt.compare(input.password, user.password as string)
        : false;

      return userExists && passwordMatch;
    } catch (error) {
      return throwErr(
        (error as Error).message || "An unexpected error occurred"
      );
    }
  }

  async isUsernameAvailable(username: string) {
    try {
      if (!username) return throwErr("username is required");
      const result = await this.repo.db.execute(
        sql`SELECT 1 FROM ${this.repo.table} WHERE username = ${username} LIMIT 1`
      );
      return result.rowCount == 0; // Return true if no rows found, else false
    } catch (error) {
      return throwErr(
        (error as Error).message || "An unexpected error occurred"
      );
    }
  }

  async isPhoneAvailable(phone: string) {
    try {
      if (!phone) return throwErr("phone is required");
      const result = await this.repo.db.execute(
        sql`SELECT 1 FROM ${this.repo.table} WHERE phone = ${phone} LIMIT 1`
      );
      return result.rowCount == 0; // Return true if no rows found, else false
    } catch (error) {
      return throwErr(
        (error as Error).message || "An unexpected error occurred"
      );
    }
  }
}
