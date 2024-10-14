import { Request, Response } from "express";
import * as v from "../../utils/validation.util";
import { SafeParseResult } from "valibot";
import { client } from "../../db";

import { RequestQuerySchema } from "../../schemas/query.schema";

import { VResult } from "../../types";
import { RoutesController } from "../../controllers/routes.controller";
import { routeTD } from "../atest-data/routes.data";
import { NewRoutesSchema } from "../../schemas/routes.schema";
import { throwE } from "../utils";

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

describe("Routes Controller", () => {
  const routesController = new RoutesController();
  const route = routeTD.build();
  const { id, ...routeT } = route;
  const routes = routeTD.buildList(10);

  const flattenedIssues = { nested: ["Invalid input"] };
  const issues = [{ message: "Invalid input" }];
  let validationResult: VResult = {
    issues: null,
    output: null,
  };
  describe("createRoute", () => {
    const validation = validationResult as SafeParseResult<
      typeof NewRoutesSchema
    >;
    it("should return 400 when validation fails", async () => {
      validationResult.issues = issues;
      const spySafeParseAsyn = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);
      const spyFlatten = jest
        .spyOn(v, "flatten")
        .mockReturnValue(flattenedIssues);

      await routesController.createRoute(req as Request, res as Response);

      expect(spySafeParseAsyn).toHaveBeenCalledTimes(1);
      expect(spyFlatten).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(flattenedIssues);
    });

    it("should return 404 when service did not return created route", async () => {
      validationResult.issues = null;
      validationResult.output = routeT;

      const spySafeParseAsyn = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyService = jest
        .spyOn(routesController.service, "createRoute")
        .mockResolvedValue(undefined);

      await routesController.createRoute(req as Request, res as Response);

      expect(spySafeParseAsyn).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Service did not return created route",
      });
    });
    it("should return 500 when service throw error", async () => {
      validationResult.issues = null;
      validationResult.output = routeT;

      const spySafeParseAsyn = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyService = jest
        .spyOn(routesController.service, "createRoute")
        .mockRejectedValue(throwE("Service Error"));

      await routesController.createRoute(req as Request, res as Response);

      expect(spySafeParseAsyn).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Service Error",
      });
    });

    it("should return 201 when successful", async () => {
      validationResult.issues = null;
      validationResult.output = routeT;

      const spySafeParseAsyn = jest
        .spyOn(v, "safeParseAsync")
        .mockResolvedValue(validation);

      const spyService = jest
        .spyOn(routesController.service, "createRoute")
        .mockResolvedValue(route);

      await routesController.createRoute(req as Request, res as Response);

      expect(spySafeParseAsyn).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(route);
    });
  });
  describe("getRoutes", () => {
    const validation = validationResult as SafeParseResult<
      typeof NewRoutesSchema
    >;

    it("should return 400 when validation fails", async () => {
      validationResult.issues = issues;
      const spySafeParse = jest
        .spyOn(v, "safeParse")
        .mockReturnValue(validation);
      const spyFlatten = jest
        .spyOn(v, "flatten")
        .mockReturnValue(flattenedIssues);
      await routesController.getRoutes(req as Request, res as Response);

      expect(spySafeParse).toHaveBeenCalledTimes(1);
      expect(spyFlatten).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(flattenedIssues);
    });

    it("should return 404 when service returned nothing", async () => {
      validationResult.issues = null;
      validationResult.output = { l: "10", o: "0" };

      const spySafeParse = jest
        .spyOn(v, "safeParse")
        .mockReturnValue(validation);

      const spyService = jest
        .spyOn(routesController.service, "getRoutes")
        .mockResolvedValue(undefined);

      await routesController.getRoutes(req as Request, res as Response);

      expect(spySafeParse).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Service did not return routes",
      });
    });

    it("should return 200 when routes are returned", async () => {
      validationResult.issues = null;
      validationResult.output = { l: "10", o: "0" };

      const spySafeParse = jest
        .spyOn(v, "safeParse")
        .mockReturnValue(validation);

      const spyService = jest
        .spyOn(routesController.service, "getRoutes")
        .mockResolvedValue(routes);

      await routesController.getRoutes(req as Request, res as Response);

      expect(spySafeParse).toHaveBeenCalledTimes(1);
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(routes);
    });
  });
});
