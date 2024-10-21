import { Inject } from "../decorators/injector";
import { OldRolesSchema, NewRolesSchema } from "../schemas/roles.schema";
import { RolesService } from "../services/roles.service";
import { Request, Response } from "express";
import { RequestQuerySchema } from "../schemas/query.schema";
import { flatten, safeParse, safeParseAsync } from "../utils/validation.util";

export class RolesController {
  @Inject(RolesService) service: RolesService;

  async createRole(req: Request, res: Response) {
    try {
      // Asynchronously validate the request body
      const result = await safeParseAsync(NewRolesSchema, req.body, {
        abortPipeEarly: true,
      });

      // Handle validation issues
      if (result.issues) {
        return res.status(400).json(flatten(result.issues));
      }

      // Create the role using the validated data
      const newRole = await this.service.createRole(result.output);

      //handle role creation failure
      if (!newRole) {
        return res.status(404).json({ message: "Did not return created role" });
      }
      // Return the created role
      return res.status(201).json(newRole);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }

  async getRoles(req: Request, res: Response) {
    try {
      // Validate the query parameters
      const query = safeParse(RequestQuerySchema, req.query, {
        abortPipeEarly: true,
      });

      // Handle validation issues
      if (query.issues) {
        return res.status(400).json(flatten(query.issues));
      }

      // Parse limit and offset from the validated query
      const limit = parseInt(query.output.l);
      const offset = parseInt(query.output.o);

      // Fetch the roles with the specified limit and offset
      const roles = await this.service.getRoles(limit, offset);

      //if roles was not found
      if (!roles) {
        return res
          .status(404)
          .json({ message: "Service did not return roles" });
      }
      // Return the list of roles
      return res.status(200).json(roles);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      // Asynchronously validate the request body
      const result = await safeParseAsync(OldRolesSchema, req.body, {
        abortPipeEarly: true,
      });

      // Handle validation issues
      if (result.issues) {
        return res.status(400).json(flatten(result.issues));
      }

      // Update the role using the validated data
      const updatedRole = await this.service.updateRole(result.output);

      // If the role is not found, return a 404 response
      if (!updatedRole) {
        return res
          .status(404)
          .json({ message: "Service did not return updated role" });
      }

      // Return the updated role
      return res.status(200).json(updatedRole);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }

  async getRole(req: Request, res: Response) {
    try {
      //get the id from the request params
      const id = req.params.id;

      //if id not provided, return 400
      if (!id) {
        return res.status(400).json({ message: "ID is not specified" });
      }
      //get role with the given id
      const response = await this.service.getRole(id);

      //if role is not found
      if (!response) {
        return res.status(404).json({ message: "role not found" });
      }
      //return the role response
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }
  async deleteRole(req: Request, res: Response) {
    //always return forbidden status 403
    return res.status(403).json({ message: "Role deletion is forbidden" });
  }
}
