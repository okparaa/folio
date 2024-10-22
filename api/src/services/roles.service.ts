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
import { NotCreatedException } from "../exceptions/notCreated.exception";
import { ExpectationFailedException } from "../exceptions/expectationFailed.exception";
import { NotUpdatedException } from "../exceptions/notUpdated.exception";
import { NotFoundException } from "../exceptions/notFound.exception";

export class RolesService {
  @Inject(RolesRepository, roles) repo: RolesRepository;
  async createRole(data: InferInput<typeof NewRolesSchema>) {
    try {
      const result = (await this.repo.create(data)) as Roles;
      if (!result || !result.id) {
        throw new NotCreatedException("Could not create role");
      }
      return result;
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }

  async updateRole(data: InferInput<typeof OldRolesSchema>) {
    try {
      const result = (await this.repo.update(data)) as Roles;
      if (!result || !result.id) {
        throw new NotUpdatedException("Could not update role");
      }
      return result;
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }

  async getRoles(limit: number, offset: number) {
    try {
      return await this.repo.find(limit, offset);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
  async getRole(id: string) {
    try {
      const role = await this.repo.findOne(id);
      if (!role) {
        throw new NotFoundException(`Role with id ${id} not found`);
      }
      return role;
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }

  async patchRole(data: InferInput<typeof OldRolesSchema>) {
    try {
      const role = (await this.repo.update(data)) as Roles;
      if (!role || !role.id) {
        throw new NotUpdatedException(
          `Failed to update role with id ${data.id}`
        );
      }
      return role;
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }

  async notDuplicate(name: string) {
    try {
      const result = await this.repo.db.execute(
        sql`SELECT * FROM ${this.repo.table} WHERE name = ${name} `
      );
      return result.rowCount == 0 ? true : false;
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
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
      throw new ExpectationFailedException((error as Error).message);
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
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
