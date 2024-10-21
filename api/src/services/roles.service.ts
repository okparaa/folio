import { sql } from "drizzle-orm";
import { Roles, roles } from "../db/tables";
import { Inject } from "../decorators/injector";
import { RolesRepository } from "../repository/roles.repository";
import { User } from "../schemas/users.schema";
import {
  NewRolesSchema,
  OldRolesSchema,
  ReqInfo,
} from "../schemas/roles.schema";
import { InferInput } from "valibot";
import { throwErr } from "../utils/error.utils";

export class RolesService {
  @Inject(RolesRepository, roles) repo: RolesRepository;
  async createRole(data: InferInput<typeof NewRolesSchema>) {
    try {
      const result = (await this.repo.create(data)) as Roles;
      if (!result || !result.id) {
        return throwErr("Could not create role");
      }
      return result;
    } catch (error) {
      return throwErr(
        (error as Error).message ||
          "An unexpected error occurred while creating the role"
      );
    }
  }

  async updateRole(data: InferInput<typeof OldRolesSchema>) {
    try {
      const result = (await this.repo.update(data)) as Roles;
      if (!result || !result.id) {
        return throwErr("Could not update role");
      }
      return result;
    } catch (error) {
      return throwErr(
        (error as Error).message ||
          "An unexpected error occurred while updating the role"
      );
    }
  }

  async getRoles(limit: number, offset: number) {
    try {
      return await this.repo.find(limit, offset);
    } catch (error) {
      return throwErr(
        (error as Error).message ||
          "An unexpected error occurred while getting the roles"
      );
    }
  }
  async getRole(id: string) {
    try {
      const role = await this.repo.findOne(id);
      if (!role) {
        return throwErr(`Role with id ${id} not found`);
      }
      return role;
    } catch (error) {
      return throwErr(
        (error as Error).message ||
          "An unexpected error occurred while getting the role"
      );
    }
  }

  async patchRole(data: InferInput<typeof OldRolesSchema>) {
    try {
      const role = (await this.repo.update(data)) as Roles;
      if (!role || !role.id) {
        return throwErr(`Failed to update role with id ${data.id}`);
      }
      return role;
    } catch (error) {
      return throwErr(
        (error as Error).message ||
          "An unexpected error occurred while getting the roles"
      );
    }
  }

  async notDuplicate(name: string) {
    try {
      const result = await this.repo.db.execute(
        sql`SELECT * FROM ${this.repo.table} WHERE name = ${name} `
      );
      return result.rowCount == 0 ? true : false;
    } catch (error) {
      return throwErr(
        (error as Error).message ||
          "An unexpected error occurred while getting the roles"
      );
    }
  }

  async isSameRole(input: { id: string; name: string }) {
    try {
      const result = await this.repo.db.execute(
        sql`SELECT * FROM ${this.repo.table} WHERE name = ${input.name}`
      );

      if (result.rowCount && result.rows[0].id !== input.id) {
        return false; //another role with name exist
      }
      return true;
    } catch (error) {
      return throwErr(
        (error as Error).message ||
          "An unexpected error occurred while getting the roles"
      );
    }
  }

  /**
   * routeId.crud,routeId.crud
   * @param data
   * @param user
   */
  async isAllowed(info: ReqInfo, user: User) {
    try {
      const permissions = await this.repo.findByRoleName(user.role);

      // Clean up the baseUrl and extract the first part as the route
      const baseUrl = info.baseUrl.replace(/(^\/|\/$)/g, "").split("/");

      const route = baseUrl.length ? baseUrl[0] : "";

      // Additional logic to handle permissions can be added here, e.g., checking if the route is in permissions
      // console.log(info, route, permissions);

      return true; // Assuming you'll add permission validation logic here
    } catch (error) {
      throw new Error(
        (error as Error).message ||
          "An unexpected error occurred while processing permissions"
      );
    }
  }
}
