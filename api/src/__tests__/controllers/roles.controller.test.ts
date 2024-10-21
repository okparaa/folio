import { Request, Response } from "express";
import * as v from "../../utils/validation.util";
import { SafeParseResult } from "valibot";
import { client } from "../../db";
import { RolesController } from "../../controllers/roles.controller";
import { roleTD } from "../atest-data/roles.data";
import { NewRolesSchema, OldRolesSchema } from "../../schemas/roles.schema";
import { RequestQuerySchema } from "../../schemas/query.schema";
import { throwE } from "../utils";
import { VResult } from "../../types";
import { Roles } from "../../db/tables";

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
    json: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
  };
});

describe("Roles Controller", () => {
  const rolesController = new RolesController();
  const roleT = roleTD.build();
  const role = { ...roleT, id: "12tyr" };
  const flattenedIssues = { nested: ["Invalid input"] };
  const issues = [{ message: "Invalid input" }];
  let validationResult: VResult = {
    issues: null,
    output: null,
  };

  describe("createRole", () => {
    const validation = validationResult as SafeParseResult<
      typeof NewRolesSchema
    >;
    it("should return 400 when validation fails", async () => {
      validationResult.issues = issues;

      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyFlatten = jest
        .spyOn(v, "flatten")
        .mockReturnValue(flattenedIssues);

      await rolesController.createRole(req as Request, res as Response);

      expect(spyParseAsync).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(spyFlatten).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(flattenedIssues);
    });

    it("should return 201 when role is created", async () => {
      // need to reset the validation result
      validationResult.output = roleT;
      validationResult.issues = null;

      // Mock successful validation and service response
      const spySafeParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyService = jest
        .spyOn(rolesController.service, "createRole")
        .mockResolvedValue(role as Roles);

      await rolesController.createRole(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(role);
      expect(spySafeParseAsync).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
    });
    it("should return 404 when service return undefined or null", async () => {
      // need to reset the validation result
      validationResult.output = roleT;
      validationResult.issues = null;

      // Mock successful validation and service response
      const spySafeParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyService = jest
        .spyOn(rolesController.service, "createRole")
        .mockResolvedValue(undefined);

      await rolesController.createRole(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Did not return created role",
      });
      expect(spySafeParseAsync).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
    });
    it("should return 500 when service throws an error", async () => {
      //has been set in the previous test. set here for clarity
      validationResult.output = roleT;
      validationResult.issues = null;
      // Mock successful validation
      const spySafeParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      // Mock service throwing an error
      const spyService = jest
        .spyOn(rolesController.service, "createRole")
        .mockRejectedValue(new Error("Service Error"));

      await rolesController.createRole(req as Request, res as Response);

      expect(spySafeParseAsync).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Service Error" });
    });
  });

  describe("getRoles", () => {
    const validation = validationResult as SafeParseResult<
      typeof RequestQuerySchema
    >;
    it("should return 400 when validation fails", async () => {
      //need to reset the validation result
      validationResult.issues = issues;
      validationResult.output = null;

      const spyParse = jest.spyOn(v, "safeParse").mockReturnValue(validation);

      const spyFlatten = jest
        .spyOn(v, "flatten")
        .mockReturnValueOnce(flattenedIssues);

      await rolesController.getRoles(req as Request, res as Response);

      expect(spyParse).toHaveBeenCalledTimes(1);
      expect(spyFlatten).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(flattenedIssues);
    });

    it("should return 200 and role when request is valid", async () => {
      validationResult.output = { l: "10", o: "0" };
      validationResult.issues = null;

      const spyParse = jest.spyOn(v, "safeParse").mockReturnValue(validation);

      const spyService = jest
        .spyOn(rolesController.service, "getRoles")
        .mockResolvedValue(role);

      await rolesController.getRoles(req as Request, res as Response);

      expect(spyParse).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(role);
    });

    it("should return 404 when service did not return role", async () => {
      validationResult.output = { l: "10", o: "0" };
      validationResult.issues = null;

      const spyParse = jest.spyOn(v, "safeParse").mockReturnValue(validation);

      const spyService = jest
        .spyOn(rolesController.service, "getRoles")
        .mockResolvedValue(undefined);

      await rolesController.getRoles(req as Request, res as Response);

      expect(spyParse).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Service did not return roles",
      });
    });

    it("should return 500 when service throw error", async () => {
      validationResult.output = { l: "10", o: "0" };
      validationResult.issues = null;

      const spyParse = jest.spyOn(v, "safeParse").mockReturnValue(validation);

      const spyService = jest
        .spyOn(rolesController.service, "getRoles")
        .mockRejectedValue(throwE("Service Error"));

      await rolesController.getRoles(req as Request, res as Response);
      expect(spyParse).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Service Error" });
    });
  });

  describe("updateRole", () => {
    const validation = validationResult as SafeParseResult<
      typeof OldRolesSchema
    >;
    it("should return 400 when validation fails", async () => {
      validationResult.issues = issues;
      validationResult.output = null;

      // Mock safeParseAsync to return validation errors
      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyFlatten = jest
        .spyOn(v, "flatten")
        .mockReturnValue(flattenedIssues);

      await rolesController.updateRole(req as Request, res as Response);

      expect(spyParseAsync).toHaveBeenCalledTimes(1);
      expect(spyFlatten).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(flattenedIssues);
    });

    it("should return 404 when service did not return updated role", async () => {
      validationResult.output = role;
      validationResult.issues = null;

      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      // Mock successful validation but no role found
      const spyService = jest
        .spyOn(rolesController.service, "updateRole")
        .mockResolvedValue(undefined);

      await rolesController.updateRole(req as Request, res as Response);

      expect(spyParseAsync).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Service did not return updated role",
      });
    });

    it("should return 200 when role is updated", async () => {
      validationResult.output = role;
      validationResult.issues = null;

      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      // Mock successful validation
      const spyService = jest
        .spyOn(rolesController.service, "updateRole")
        .mockResolvedValue(role as Roles);

      await rolesController.updateRole(req as Request, res as Response);

      expect(spyParseAsync).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(role);
    });

    it("should return 500 when service throws an error", async () => {
      validationResult.output = role;
      validationResult.issues = null;

      const spyParseAsync = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      // Mock successful validation
      const spyService = jest
        .spyOn(rolesController.service, "updateRole")
        .mockRejectedValue(throwE("Service Error"));

      await rolesController.updateRole(req as Request, res as Response);

      expect(spyParseAsync).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Service Error" });
    });
  });
});
