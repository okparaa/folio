import { safeParseAsync, safeParse, flatten } from "../utils/validation.util";
import {
  SigninSchema,
  SignupSchema,
  UsersSchema,
} from "../schemas/users.schema";
import { Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { Inject } from "../decorators/injector";
import { RequestQuerySchema } from "../schemas/query.schema";
import { Users } from "../db/tables";

export class UsersController {
  @Inject(UsersService) service: UsersService;
  async signup(req: Request, res: Response) {
    try {
      // Validate the request body against the schema
      const result = await safeParseAsync(SignupSchema, req.body, {
        abortPipeEarly: true,
      });

      // Handle validation errors
      if (result.issues) {
        const flattenedIssues = flatten(result.issues);
        return res.status(400).json(flattenedIssues); // Bad request with validation issues
      }

      // Proceed with signup service
      const response = (await this.service.signup(result.output)) as Users;

      if (!response?.id)
        return res.status(405).json({ message: "Registration failed" });
      // Respond with a success status

      return res.status(201).json(response);
    } catch (error) {
      // Handle unexpected errors and return a generic error message
      return res
        .status(500)
        .json({ message: (error as Error).message || "Internal Server Error" });
    }
  }

  async signin(req: Request, res: Response) {
    try {
      // Validate the request body against the schema
      const result = await safeParseAsync(SigninSchema, req.body, {
        abortPipeEarly: true,
      });

      // Handle validation errors
      if (result.issues) {
        return res.status(400).json(flatten(result.issues)); // Return bad request with validation issues
      }

      // Generate user tokens
      const tokenUser = await this.service.createTokens(result.output.username);

      // Handle token generation failure
      if (!tokenUser) {
        return res
          .status(404)
          .json({ message: "Could not create user and token" });
      }

      const { refreshToken, currentUser } = tokenUser;

      if (!refreshToken) {
        return res.status(404).json({ message: "Could not create token" });
      }

      // Destructure and set cookie with refresh token

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true, // Ensures cookies are only sent over HTTPS
      });

      // Respond with the current user object
      return res.status(200).json(currentUser);
    } catch (error) {
      // Handle unexpected errors
      return res
        .status(500)
        .json({ message: (error as Error).message || "Internal Server Error" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const { query } = req;
      const result = safeParse(RequestQuerySchema, query);

      // Handling validation issues
      if (result.issues) {
        return res.status(400).json(flatten(result.issues));
      }

      // Convert to integers and handle NaN cases by providing default values
      const limit = parseInt(result.output.l);
      const offset = parseInt(result.output.o);

      // Fetch users based on the parsed limit and offset
      const users = await this.service.getUsers(limit, offset);
      //return 404 if service did not return users
      if (!users || !Array.isArray(users)) {
        return res
          .status(404)
          .json({ message: "Service returned invalid users" });
      }

      //return the users
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if ID is provided
      if (!id) {
        return res.status(400).json({ message: "ID is not provided" });
      }

      // Fetch the user from the service
      const user = await this.service.getUser(id);

      // If the user does not exist, return a 404 status
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return the user details
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      // Parse the request body using the schema
      const result = safeParse(UsersSchema, req.body, {
        abortPipeEarly: true,
      });

      // Handle validation issues
      if (result.issues) {
        return res.status(400).json(flatten(result.issues));
      }

      // Update the user with the validated data
      const updatedUser = await this.service.updateUser(result.output);

      // If the user is not found, return a 404 response
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return the updated user
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }
}
