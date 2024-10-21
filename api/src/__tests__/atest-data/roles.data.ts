import { Sync } from "factory.ts";
import { faker } from "@faker-js/faker";
import { Roles } from "../../db/tables";

type PickedRoles = Pick<Roles, "id" | "name" | "description">;

export const roleTD = Sync.makeFactory<PickedRoles>({
  id: faker.string.alphanumeric(5),
  name: faker.word.noun({ length: 6 }),
  description: faker.hacker.phrase(),
});
