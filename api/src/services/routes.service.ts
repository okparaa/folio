import { sql } from "drizzle-orm";
import { Routes, routes } from "../db/tables";
import { Inject } from "../decorators/injector";
import { RoutesRepository } from "../repository/routes.repository";
import { InferInput } from "valibot";
import { NewRoutesSchema, OldRoutesSchema } from "../schemas/routes.schema";
import { NotCreatedException } from "../exceptions/notCreated.exception";
import { NotUpdatedException } from "../exceptions/notUpdated.exception";

export class RoutesService {
  @Inject(RoutesRepository, routes) repo: RoutesRepository;
  async createRoute(data: InferInput<typeof NewRoutesSchema>) {
    const route = (await this.repo.create(data)) as Routes;
    if (!route.id) {
      throw new NotCreatedException("could not create route");
    }
    return route;
  }
  async getRoutes(limit: number, offset: number) {
    return await this.repo.find(limit, offset);
  }
  async getRoute(id: string) {
    return await this.repo.findOne(id);
  }
  async updateRoute(data: InferInput<typeof OldRoutesSchema>) {
    const route = (await this.repo.update(data)) as Routes;
    if (!route.id) {
      throw new NotUpdatedException("could not update route");
    }
    return route;
  }

  async noRoutePair(name: string) {
    const result = await this.repo.db.execute(
      sql`SELECT * FROM ${this.repo.table} WHERE route = ${name}`
    );

    return result.rowCount == 0 ? true : false;
  }
  async noSlugPair(name: string) {
    const result = await this.repo.db.execute(
      sql`SELECT * FROM ${this.repo.table} WHERE slug = ${name}`
    );

    return result.rowCount == 0 ? true : false;
  }
}
