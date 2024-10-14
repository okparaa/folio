import { Sync } from "factory.ts";
import { faker } from "@faker-js/faker";
import { Roles } from "../../db/tables";

type PickedRoles = Pick<Roles, "id" | "role" | "permissions" | "description">;

export const roleTD = Sync.makeFactory<PickedRoles>({
  id: faker.string.alphanumeric(5),
  role: faker.word.noun({ length: 6 }),
  permissions: faker.helpers.fromRegExp(/[a-z]{3}/).split("."),
  description: faker.hacker.phrase(),
});
