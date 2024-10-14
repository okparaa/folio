import * as v from "valibot";
import { RolesService } from "../services/roles.service";

const rolesService = new RolesService();

export const NewRolesSchema = v.objectAsync({
  role: v.pipeAsync(
    v.string("should be string"),
    v.maxLength(12, "roles name too long"),
    v.nonEmpty("roles desc empty"),
    v.checkAsync(async (role) => {
      return (await rolesService.notDuplicate(role)) as boolean;
    }, "role already created")
  ),
  description: v.pipe(
    v.string("role desc not string"),
    v.nonEmpty("role desc empty")
  ),
  type: v.optional(v.number(), 1),
});

export const OldRolesSchema = v.pipeAsync(
  v.object({
    id: v.string(),
    role: v.pipe(
      v.string("should be string"),
      v.maxLength(12, "role too long"),
      v.nonEmpty("role desc empty")
    ),
    description: v.optional(v.string("should be string")),
    type: v.optional(v.number(), 1),
  }),
  v.forwardAsync(
    v.partialCheckAsync([["role"], ["id"]], async (input) => {
      return (await rolesService.isSameRole(input)) as boolean;
    }),
    ["role"]
  )
);

export const RolesPermitsSchema = v.object({
  roleId: v.string(),
  permissions: v.array(v.string("should be string"), "array is required"),
});

export type ReqInfo = { path: string; baseUrl: string; method: string };
