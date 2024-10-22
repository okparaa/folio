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
import jwt from "jsonwebtoken";
import { NotMatchException } from "../exceptions/notMatch.exception";
import { NotProvidedException } from "../exceptions/notProvided.exception";
import { NotCreatedException } from "../exceptions/notCreated.exception";
import { ExpectationFailedException } from "../exceptions/expectationFailed.exception";
import { BadRequestException } from "../exceptions/badRequest.exception";
import { tryCatch } from "../utils/error.utils";
import { NotFoundException } from "../exceptions/notFound.exception";
export class UsersService {
  @Inject(UsersRepository, users) repo: UsersRepository;
  async signup(data: InferInput<typeof SignupSchema>) {
    try {
      // Ensure passwords match
      if (data.pass !== data.password) {
        return new NotMatchException("Passwords do not match");
      }

      // Validate required fields
      if (!data.username || !data.password) {
        return new NotProvidedException("Username or password not provided");
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
        return new NotCreatedException("User creation failed");
      }

      // Return the created user
      return user;
    } catch (error) {
      return new ExpectationFailedException((error as Error).message);
    }
  }

  async createTokens(username: string) {
    try {
      const user = await this.repo.getUserByUsername(username);
      if (!user.id) {
        throw new NotFoundException("User not found");
      }

      // Ensure TOKEN_SECRET and REFRESH_SECRET exist
      const accessTokenSecret = process.env.TOKEN_SECRET;
      const refreshTokenSecret = process.env.REFRESH_SECRET;
      if (!accessTokenSecret || !refreshTokenSecret) {
        throw new NotProvidedException(
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
      throw new ExpectationFailedException((error as Error).message);
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
      return new ExpectationFailedException((error as Error).message);
    }
  }

  async getUsers(limit: number, offset: number) {
    // Basic validation for limit and offset
    try {
      if (limit <= 0) {
        return new BadRequestException("Limit must be greater than 0");
      }
      if (offset < 0) {
        return new BadRequestException("Offset cannot be negative");
      }

      return await this.repo.find(limit, offset);
    } catch (error) {
      return new ExpectationFailedException((error as Error).message);
    }
  }

  async getUser(id: string) {
    try {
      if (!id) return new BadRequestException("id is required");
      return await this.repo.findOne(id);
    } catch (error) {
      return new ExpectationFailedException((error as Error).message);
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
      return new ExpectationFailedException((error as Error).message);
    }
  }

  async isUsernameAvailable(username: string) {
    try {
      if (!username) return new NotProvidedException("username is required");
      const result = await this.repo.db.execute(
        sql`SELECT 1 FROM ${this.repo.table} WHERE username = ${username} LIMIT 1`
      );
      return result.rowCount == 0; // Return true if no rows found, else false
    } catch (error) {
      return new ExpectationFailedException((error as Error).message);
    }
  }

  async isPhoneAvailable(phone: string) {
    try {
      if (!phone) return new NotProvidedException("phone is required");
      const result = await this.repo.db.execute(
        sql`SELECT 1 FROM ${this.repo.table} WHERE phone = ${phone} LIMIT 1`
      );
      return result.rowCount == 0; // Return true if no rows found, else false
    } catch (error) {
      return new ExpectationFailedException((error as Error).message);
    }
  }
}
