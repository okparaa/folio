import { QueryResultBase } from "pg";
import { client } from "../../db";
import { UsersService } from "../../services/users.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userTD } from "../atest-data/users.data";
import { throwE } from "../utils";
import { Users } from "../../db/tables";

const response = {} as QueryResultBase;

afterAll(() => {
  client.end();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("users.service", () => {
  // signup tests
  const user = userTD.build() as Users;
  const userT = {
    ...user,
    pass: user.password,
    lastname: user.lastname as string,
    photoUrl: user.photoUrl as string,
  };

  const { id, ...newUser } = userT;
  const usersService = new UsersService();
  describe("signup", () => {
    const mockRepo = jest
      .spyOn(usersService.repo, "create")
      .mockResolvedValue({ ...user, password: "password123" });

    const bcryptHash = jest
      .spyOn(bcrypt, "hash")
      .mockImplementationOnce(() => Promise.resolve("password123"));

    it("should return registered user when data is valid", async () => {
      const { password, pass, ...rest } = newUser;
      const result = await usersService.signup(newUser);
      expect(bcryptHash).toHaveBeenCalledWith(newUser.password, 10);
      expect(mockRepo).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...rest,
        password: "password123",
        id: user.id,
      });
    });

    it("should throw error when passwords did not match'", async () => {
      await expect(
        usersService.signup({ ...newUser, password: "54uyr" })
      ).rejects.toThrow(throwE("Passwords do not match"));

      await expect(
        usersService.signup({ ...newUser, username: "" })
      ).rejects.toThrow(throwE("Username or password not provided"));
    });

    it("should throw error when user could not be created", async () => {
      const mockRepo = jest
        .spyOn(usersService.repo, "create")
        .mockResolvedValue({});

      await expect(usersService.signup({ ...newUser })).rejects.toThrow(
        throwE("User creation failed")
      );
    });
  });

  describe("createTokens function", () => {
    it("should throw an error when user does not exist", async () => {
      // Mock repository to return null (user not found)
      const mockRepo = jest
        .spyOn(usersService.repo, "getUserByUsername")
        .mockResolvedValue({});

      await expect(usersService.createTokens(user.username)).rejects.toThrow(
        throwE("User not found")
      );
      expect(mockRepo).toHaveBeenCalled();
    });

    it("should throw an error when TOKEN_SECRET or REFRESH_SECRET is not defined", async () => {
      // Mock repository to return a user
      const mockRepo = jest
        .spyOn(usersService.repo, "getUserByUsername")
        .mockResolvedValue(user);

      // Temporarily remove the environment variables for this test
      const originalTokenSecret = process.env.TOKEN_SECRET;
      const originalRefreshSecret = process.env.REFRESH_SECRET;
      delete process.env.TOKEN_SECRET;
      delete process.env.REFRESH_SECRET;

      await expect(usersService.createTokens(newUser.username)).rejects.toThrow(
        throwE("Token secrets are not defined in environment variables")
      );
      expect(mockRepo).toHaveBeenCalled();
      // Restore the original environment variables
      process.env.TOKEN_SECRET = originalTokenSecret;
      process.env.REFRESH_SECRET = originalRefreshSecret;
    });

    it("should generate accessToken and refreshToken when successful", async () => {
      // Mock repository to return a user
      const { password, ...rest } = user;

      const mockRepo = jest
        .spyOn(usersService.repo, "getUserByUsername")
        .mockResolvedValue(rest);
      // Set environment variables for token secrets

      process.env.TOKEN_SECRET = "access_secret";
      process.env.REFRESH_SECRET = "refresh_secret";

      // Mock jwt.sign for accessToken and refreshToken
      const mockJwt = jest
        .spyOn(jwt, "sign")
        .mockImplementation((payload, secret, options) => {
          if (secret === process.env.TOKEN_SECRET) {
            return "access_token";
          }
          if (secret === process.env.REFRESH_SECRET) {
            return "refresh_token";
          }
        });

      const result = await usersService.createTokens(newUser.username);

      // Expect the repository to be called correctly
      expect(mockRepo).toHaveBeenCalledWith(newUser.username);

      // Expect jwt.sign to be called for accessToken and refreshToken
      expect(mockJwt).toHaveBeenCalledWith(
        { id: user.id },
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
      );
      expect(mockJwt).toHaveBeenCalledWith(
        { id: user.id, role: user.role },
        process.env.TOKEN_SECRET,
        { expiresIn: "4h", algorithm: "HS256" }
      );

      const { role, ...nrest } = rest;
      // Validate the result object
      expect(result).toEqual({
        currentUser: {
          ...nrest,
          id: user.id,
          accessToken: "access_token",
        },
        refreshToken: "refresh_token",
      });
    });
  });

  describe("updateUser function", () => {
    it("should update the user awhen correct data is provided", async () => {
      const { password, pass, ...restUser } = userT;
      const mockRepo = jest
        .spyOn(usersService.repo, "update")
        .mockResolvedValue(restUser);

      const result = await usersService.updateUser(restUser);

      // Ensure repo.update is called with the correct data
      expect(mockRepo).toHaveBeenCalledWith(restUser);
      // Ensure the result does not contain the password
      expect(result).toEqual(restUser);
    });

    it("should throw an error when the update operation fails", async () => {
      // Mock repository to simulate an error
      const mockRepo = jest
        .spyOn(usersService.repo, "update")
        .mockRejectedValue(throwE("Error updating user"));

      await expect(usersService.updateUser(userT)).rejects.toThrow(
        throwE("Error updating user")
      );
    });
  });

  describe("getUsers function", () => {
    const userList = userTD.buildList(10);
    it("should return users when called with valid limit and offset", async () => {
      const mockRepo = jest
        .spyOn(usersService.repo, "find")
        .mockResolvedValue(userList);

      const limit = 10;
      const offset = 0;
      // Call the function
      const result = await usersService.getUsers(limit, offset);

      // Ensure the repository method was called with correct parameters
      expect(mockRepo).toHaveBeenCalledWith(limit, offset);

      // Ensure the result matches the mocked data
      expect(result).toEqual(userList);
    });

    it("should throw an error when limit is less than or equal to 0", async () => {
      const limit = 0; // Invalid limit
      const offset = 0;

      // Call the function and expect an error to be thrown
      await expect(usersService.getUsers(limit, offset)).rejects.toThrow(
        throwE("Limit must be greater than 0")
      );
    });

    it("should throw an error when offset is negative", async () => {
      const limit = 10;
      const offset = -1; // Invalid offset

      // Call the function and expect an error to be thrown
      await expect(usersService.getUsers(limit, offset)).rejects.toThrow(
        throwE("Offset cannot be negative")
      );
    });

    it("should return an empty array when no users are found", async () => {
      // Mock the repository's find method to return an empty array
      const mockRepo = jest
        .spyOn(usersService.repo, "find")
        .mockResolvedValue([]);
      const limit = 10;
      const offset = 0;

      // Call the function
      const result = await usersService.getUsers(limit, offset);
      // Ensure the repository method was called with correct parameters
      expect(mockRepo).toHaveBeenCalledWith(limit, offset);

      // Expect the result to be an empty array
      expect(result).toEqual([]);
    });
  });

  describe("getUser function", () => {
    it("should return a user when called with a valid id", async () => {
      // Mock the repository's findOne method to return a user
      const mockRepo = jest
        .spyOn(usersService.repo, "findOne")
        .mockResolvedValue(user);

      // Call the function
      const result = await usersService.getUser(user.id);

      // Ensure the repository method was called with the correct id
      expect(mockRepo).toHaveBeenCalledWith(user.id);

      // Ensure the result matches the mocked data
      expect(result).toEqual(user);
    });

    it("should throw an error when id is not provided", async () => {
      // Call the function with an empty id and expect an error to be thrown
      await expect(usersService.getUser("")).rejects.toThrow(
        throwE("id is required")
      );
    });

    it("should return undefined when user does not exist", async () => {
      // Mock the repository's findOne method to return null
      const mockRepo = jest
        .spyOn(usersService.repo, "findOne")
        .mockResolvedValue(undefined);

      // Call the function
      const result = await usersService.getUser(user.id);

      // Ensure the repository method was called with the correct id
      expect(mockRepo).toHaveBeenCalledWith(user.id);

      // Expect the result to be null
      expect(result).toBeUndefined();
    });
  });

  describe("verifyUser", () => {
    it("should return false when user does not exist", async () => {
      const mockRepo = jest
        .spyOn(usersService.repo, "getUserByUsername")
        .mockResolvedValue(undefined); // Simulate user not found

      const result = await usersService.verifyUser({
        username: "nonexistent",
        password: "password",
      });
      expect(result).toBe(false);
      expect(mockRepo).toHaveBeenCalledWith("nonexistent");
    });

    it("should return false when user exists but password is incorrect", async () => {
      const mockRepo = jest
        .spyOn(usersService.repo, "getUserByUsername")
        .mockResolvedValue({
          username: user.username,
          password: "hashedpassword",
          id: user.id,
        });

      const mockBcrypt = jest
        .spyOn(bcrypt, "compare")
        .mockImplementation(() => Promise.resolve(false)); // Simulate incorrect password

      const result = await usersService.verifyUser({
        username: user.username,
        password: "wrongpassword",
      });
      expect(result).toBe(false);
      expect(mockRepo).toHaveBeenCalledWith(user.username);
      expect(mockBcrypt).toHaveBeenCalledWith(
        "wrongpassword",
        "hashedpassword"
      );
    });

    it("should return true when user exists and password is correct", async () => {
      const mockRepo = jest
        .spyOn(usersService.repo, "getUserByUsername")
        .mockResolvedValue({
          username: user.username,
          password: "hashedpassword",
          id: user.id,
        });

      const mockBcrypt = jest
        .spyOn(bcrypt, "compare")
        .mockImplementation(() => Promise.resolve(true)); // Simulate correct password

      const result = await usersService.verifyUser({
        username: user.username,
        password: "correctpassword",
      });
      expect(result).toBe(true);
      expect(mockRepo).toHaveBeenCalledWith(user.username);
      expect(mockBcrypt).toHaveBeenCalledWith(
        "correctpassword",
        "hashedpassword"
      );
    });
  });

  describe("isUsernameAvailable", () => {
    it("should return true when username is available (no rows found)", async () => {
      // Mock the database query result to simulate no username found (rowCount = 0)
      const mockRepo = jest
        .spyOn(usersService.repo.db, "execute")
        .mockResolvedValue({ ...response, rows: [], rowCount: 0 });

      const result = await usersService.isUsernameAvailable("newuser");
      expect(result).toBe(true);
      expect(mockRepo).toHaveBeenCalled();
    });

    it("should return false when username is already taken (row found)", async () => {
      // Mock the database query result to simulate a row found (rowCount = 1)
      const mockRepo = jest
        .spyOn(usersService.repo.db, "execute")
        .mockResolvedValue({ ...response, rows: [{}], rowCount: 1 });

      const result = await usersService.isUsernameAvailable("existinguser");
      expect(result).toBe(false);
      expect(mockRepo).toHaveBeenCalled();
    });

    it("should throw error when username is not provided", async () => {
      // Mock the database query result to simulate a row found (rowCount = 1)
      const mockRepo = jest
        .spyOn(usersService.repo.db, "execute")
        .mockResolvedValue({ ...response, rows: [{}], rowCount: 1 });

      await expect(usersService.isUsernameAvailable("")).rejects.toThrow(
        throwE("username is required")
      );

      expect(mockRepo).not.toHaveBeenCalled();
    });

    it("should throw an error when database error occurs", async () => {
      // Simulate a database error by rejecting the promise
      jest
        .spyOn(usersService.repo.db, "execute")
        .mockRejectedValue(new Error("Database error"));

      await expect(
        usersService.isUsernameAvailable(user.username)
      ).rejects.toThrow("Database error");
    });
  });

  describe("isPhoneAvailable", () => {
    it("should throw an error when phone is not provided", async () => {
      await expect(usersService.isPhoneAvailable("")).rejects.toThrow(
        throwE("phone is required")
      );
    });

    it("should return true when phone number is available (no rows found)", async () => {
      // Mock the database query result to simulate no phone found (rowCount = 0)
      const mockRepo = jest
        .spyOn(usersService.repo.db, "execute")
        .mockResolvedValue({ ...response, rows: [], rowCount: 0 });

      const result = await usersService.isPhoneAvailable(user.phone);
      expect(result).toBe(true);
      expect(mockRepo).toHaveBeenCalled();
    });

    it("should return false when phone number is already taken (row found)", async () => {
      // Mock the database query result to simulate a row found (rowCount = 1)
      const mockRepo = jest
        .spyOn(usersService.repo.db, "execute")
        .mockResolvedValue({ ...response, rows: [{}], rowCount: 1 });

      const result = await usersService.isPhoneAvailable(user.phone);
      expect(result).toBe(false);
      expect(mockRepo).toHaveBeenCalled();
    });

    it("should throw an error when database error occurs", async () => {
      // Simulate a database error by rejecting the promise
      jest
        .spyOn(usersService.repo.db, "execute")
        .mockRejectedValue(new Error("Database error"));

      await expect(usersService.isPhoneAvailable(user.phone)).rejects.toThrow(
        "Database error"
      );
    });
  });
});
