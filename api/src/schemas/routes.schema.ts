import * as v from "valibot";
import { RoutesService } from "../services/routes.service";
const routesService = new RoutesService();

export const NewRoutesSchema = v.objectAsync({
  route: v.pipeAsync(
    v.string("route not string"),
    v.maxLength(30, "route too long"),
    v.nonEmpty("route empty"),
    v.regex(/\w{2,6}:\w{1,20}$/, "bad format (get:users/xyz)"),
    v.checkAsync(async (route) => {
      return await routesService.noRoutePair(route);
    }, "route exists")
  ),
  slug: v.pipeAsync(
    v.string("should be string"),
    v.nonEmpty("value is required"),
    v.checkAsync(async (slug) => {
      return await routesService.noSlugPair(slug);
    }, "slug exists")
  ),
  description: v.pipe(
    v.string("route desc not string"),
    v.nonEmpty("route desc empty")
  ),
});

export const OldRoutesSchema = v.object({
  id: v.string(),
  route: v.pipe(
    v.string("route not string"),
    v.maxLength(12, "route too long"),
    v.nonEmpty("route empty"),
    v.regex(/\w{2,6}:\w{1,20}$/, "e.g: -> get:ijk/xyz")
  ),
  slug: v.pipe(v.string("should be string"), v.nonEmpty("value is required")),
  description: v.pipe(
    v.string("route desc not string"),
    v.nonEmpty("route desc empty")
  ),
});
