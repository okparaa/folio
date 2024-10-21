import { Inject } from "../decorators/injector";
import { NewRoutesSchema, OldRoutesSchema } from "../schemas/routes.schema";
import { Request, Response } from "express";
import { RoutesService } from "../services/routes.service";
import { RequestQuerySchema } from "../schemas/query.schema";
import { flatten, safeParse, safeParseAsync } from "../utils/validation.util";

export class RoutesController {
  @Inject(RoutesService) service: RoutesService;
  async createRoute(req: Request, res: Response) {
    try {
      // validate request body
      const result = await safeParseAsync(NewRoutesSchema, req.body, {
        abortPipeEarly: true,
      });
      //handle validation issues
      if (result.issues) {
        return res.status(400).json(flatten(result.issues));
      }
      //create the role with the validated data
      const response = await this.service.createRoute(result.output);
      //return 404 if create route is not returned
      if (!response) {
        return res
          .status(404)
          .json({ message: "Service did not return created route" });
      }
      //return the created route as response
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }
  async getRoutes(req: Request, res: Response) {
    try {
      //validate the request query using the defined schema
      const query = safeParse(RequestQuerySchema, req.query, {
        abortPipeEarly: true,
      });
      //handle validation issued
      if (query.issues) {
        return res.status(400).json(flatten(query.issues));
      }

      //get the limit and offset from the validated data
      const limit = parseInt(query.output.l);
      const offset = parseInt(query.output.o);

      //get the routes using the limit and offset
      const response = await this.service.getRoutes(limit, offset);

      //return 404 if the routes are not returned by the service
      if (!response || !Array.isArray(response)) {
        return res
          .status(404)
          .json({ message: "Service did not return routes" });
      }

      //return routes
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }
  async updateRoute(req: Request, res: Response) {
    try {
      //asynchronously validate the request body using the defined schema
      const result = await safeParseAsync(OldRoutesSchema, req.body, {
        abortPipeEarly: true,
      });
      //handle the validation issues
      if (result.issues) {
        return res.status(400).json(flatten(result.issues));
      }
      //update the route with the validated data
      const response = await this.service.updateRoute(result.output);
      //return 404 if validated route is not returned
      if (!response) {
        return res
          .status(404)
          .json({ message: "Service did not return updated route" });
      }
      //return the route as response
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }
  async getRoute(req: Request, res: Response) {
    try {
      //get the id from the request params
      const id = req.params.id;
      //return 400 if id is not provided
      if (!id) {
        return res.status(400).json({ message: "ID is not valid" });
      }
      //get the route using the id
      const response = await this.service.getRoute(id);
      //return 404 if route does not exist
      if (!response) {
        return res.status(404).json("Route does not exist");
      }
      //return the route as response
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }
  async delete(req: Request, res: Response) {
    //always return 403 forbidden
    return res.status(403).json({ message: "Deletion of route is forbidden" });
  }
}
