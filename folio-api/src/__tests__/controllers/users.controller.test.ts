import { Request, Response } from "express";
import * as v from "../../utils/validation.util";
import { SafeParseResult } from "valibot";
import { UsersController } from "../../controllers/users.controller";
import {
  SigninSchema,
  SignupSchema,
  UsersSchema,
} from "../../schemas/users.schema";
import { client } from "../../db";
import { userTD } from "../atest-data/users.data";
import { RequestQuerySchema } from "../../schemas/query.schema";
import { VResult } from "../../types";
import { Users } from "../../db/tables";

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(() => {
  client.end();
});

let req: Partial<Request>;
let res: Partial<Response>;

beforeEach(() => {
  jest.restoreAllMocks();
  req = { body: {}, params: {}, query: {} };
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn(),
  };
});

describe("Users Controller", () => {
  const usersController = new UsersController();
  const user = userTD.build();
  const users = userTD.buildList(10);
  const { id, ...userT } = user;
  const flattenedIssues = { nested: ["Invalid input"] };
  const issues = [{ message: "Invalid input" }];
  let validationResult: VResult = {
    issues: null,
    output: null,
  };
  describe("Signup", () => {
    const validation = validationResult as SafeParseResult<typeof SignupSchema>;
    it("should return 400 when validation fails", async () => {
      validationResult.issues = issues;

      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyFlatten = jest
        .spyOn(v, "flatten")
        .mockReturnValue(flattenedIssues);

      await usersController.signup(req as Request, res as Response);

      expect(spyParseAsync).toHaveBeenCalled();
      expect(spyFlatten).toHaveBeenCalledWith(validationResult.issues);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(flattenedIssues);
    });

    it("should return 201 with service response when signup is successful", async () => {
      validationResult.issues = null;
      validationResult.output = user;

      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyService = jest
        .spyOn(usersController.service, "signup")
        .mockResolvedValue(user as Users);

      const result = await usersController.signup(
        req as Request,
        res as Response
      );

      expect(spyParseAsync).toHaveBeenCalled();
      expect(spyService).toHaveBeenCalledWith(validationResult.output);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return 500 error when user is not created", async () => {
      validationResult.output = userT;
      validationResult.issues = null;

      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyService = jest
        .spyOn(usersController.service, "signup")
        .mockResolvedValue(undefined);

      await usersController.signup(req as Request, res as Response);

      expect(spyService).toHaveBeenCalledWith(userT);
      expect(spyParseAsync).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Registration failed",
      });
    });
  });

  describe("signin", () => {
    const validation = validationResult as SafeParseResult<typeof SigninSchema>;
    it("should return 400 validation fails", async () => {
      validationResult.issues = issues;

      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyFlatten = jest
        .spyOn(v, "flatten")
        .mockReturnValue(flattenedIssues);

      await usersController.signin(req as Request, res as Response);

      expect(spyParseAsync).toHaveBeenCalledTimes(1);
      expect(spyFlatten).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(flattenedIssues);
    });

    it("should return 404 when token creation fails", async () => {
      validationResult.issues = null;
      validationResult.output = userT;

      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyCreateToken = jest
        .spyOn(usersController.service, "createTokens")
        .mockResolvedValue(undefined);

      await usersController.signin(req as Request, res as Response);

      expect(spyParseAsync).toHaveBeenCalledTimes(1);
      expect(spyCreateToken).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Could not create user and token",
      });
    });

    it("should return 404 when token creation fails", async () => {
      validationResult.issues = null;
      validationResult.output = userT;

      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyCreateToken = jest
        .spyOn(usersController.service, "createTokens")
        .mockResolvedValue({
          refreshToken: "",
          currentUser: { ...(user as Users), accessToken: "" },
        });

      await usersController.signin(req as Request, res as Response);

      expect(spyParseAsync).toHaveBeenCalledTimes(1);
      expect(spyCreateToken).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Could not create token",
      });
    });

    it("should return 200 when user, refresh token and cookie created", async () => {
      validationResult.output = user;
      validationResult.issues = null;
      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyCreateToken = jest
        .spyOn(usersController.service, "createTokens")
        .mockResolvedValue({
          refreshToken: "refresh-token",
          currentUser: { ...(user as Users), accessToken: "access-token" },
        });

      await usersController.signin(req as Request, res as Response);

      expect(spyCreateToken).toHaveBeenCalledWith(user.username);
      expect(spyParseAsync).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        ...user,
        accessToken: "access-token",
      });
      expect(res.cookie).toHaveBeenCalledWith("refreshToken", "refresh-token", {
        httpOnly: true,
        secure: true,
      });
    });
  });

  describe("getUsers", () => {
    const validation = validationResult as SafeParseResult<
      typeof RequestQuerySchema
    >;
    it("should return 400 when validation fails", async () => {
      validationResult.issues = issues;
      // Mock safeParse to return validation errors
      const spySafeParse = jest
        .spyOn(v, "safeParse")
        .mockReturnValue(validation);

      const spyFlatten = jest
        .spyOn(v, "flatten")
        .mockReturnValue(flattenedIssues);

      await usersController.getUsers(req as Request, res as Response);

      expect(spySafeParse).toHaveBeenCalledTimes(1);
      expect(spyFlatten).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(flattenedIssues);
    });

    it("should return users with 200 when request is valid", async () => {
      validationResult.issues = null;
      validationResult.output = { l: "5", o: "10" };

      // Mock successful validation and service response
      const spySafeParse = jest
        .spyOn(v, "safeParse")
        .mockReturnValue(validation);
      const spyService = jest
        .spyOn(usersController.service, "getUsers")
        .mockResolvedValue(users);

      await usersController.getUsers(req as Request, res as Response);

      expect(spySafeParse).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should return 500 when service throws an error", async () => {
      validationResult.issues = null;
      validationResult.output = { l: "5", o: "10" };

      // Mock successful validation
      const spySafeParse = jest
        .spyOn(v, "safeParse")
        .mockReturnValue(validation);

      // Mock service throwing an error
      const spyService = jest
        .spyOn(usersController.service, "getUsers")
        .mockRejectedValue(new Error("Service Error"));

      await usersController.getUsers(req as Request, res as Response);

      expect(spySafeParse).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Service Error" });
    });
    it("should return 404 when service return invalid users", async () => {
      validationResult.issues = null;
      validationResult.output = { l: "5", o: "10" };

      // Mock successful validation
      const spySafeParse = jest
        .spyOn(v, "safeParse")
        .mockReturnValue(validation);

      // Mock service throwing an error
      const spyService = jest
        .spyOn(usersController.service, "getUsers")
        .mockResolvedValue(undefined);

      await usersController.getUsers(req as Request, res as Response);

      expect(spySafeParse).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Service returned invalid users",
      });
    });
  });
  describe("getUser", () => {
    it("should return 400 when ID is not provided", async () => {
      // Call getUser without setting req.params.id
      await usersController.getUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "ID is not provided",
      });
    });

    it("should return 404 when user is not found", async () => {
      req.params!.id = "123";

      // Mock service.getUser to return null (user not found)
      const spyService = jest
        .spyOn(usersController.service, "getUser")
        .mockResolvedValue(null);

      await usersController.getUser(req as Request, res as Response);

      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return the user with 200 when request is valid", async () => {
      req.params!.id = "123";

      // Mock service.getUser to return a user object
      const spyService = jest
        .spyOn(usersController.service, "getUser")
        .mockResolvedValue(user);

      await usersController.getUser(req as Request, res as Response);

      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return 500 when service throws an error", async () => {
      // Mock service.getUser to throw an error
      req.params!.id = "123";

      const spyService = jest
        .spyOn(usersController.service, "getUser")
        .mockRejectedValue(new Error("Service Error"));

      await usersController.getUser(req as Request, res as Response);

      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Service Error" });
    });
  });

  describe("updateUser", () => {
    const validation = validationResult as SafeParseResult<typeof UsersSchema>;
    it("should return 400 when validation fails", async () => {
      // Mock safeParse to return validation errors
      validationResult.issues = issues;
      validationResult.output = null;

      const spySafeParse = jest
        .spyOn(v, "safeParse")
        .mockReturnValue(validation);
      jest.spyOn(v, "flatten").mockReturnValue(flattenedIssues);

      await usersController.updateUser(req as Request, res as Response);

      expect(spySafeParse).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(flattenedIssues);
    });

    it("should return 404 when user is not found", async () => {
      validationResult.issues = null;
      validationResult.output = user;

      // Mock successful validation but no user found
      const spySafeParse = jest
        .spyOn(v, "safeParse")
        .mockReturnValue(validation);
      const spyService = jest
        .spyOn(usersController.service, "updateUser")
        .mockResolvedValue(undefined);

      await usersController.updateUser(req as Request, res as Response);

      expect(spySafeParse).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return the updated user with 200 when request is valid", async () => {
      validationResult.issues = null;
      validationResult.output = user;

      // Mock successful validation and service response
      const spySafeParse = jest
        .spyOn(v, "safeParse")
        .mockReturnValue(validation);

      const spyService = jest
        .spyOn(usersController.service, "updateUser")
        .mockResolvedValue(user as Users);

      await usersController.updateUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });
});
