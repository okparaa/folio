import { Sync } from "factory.ts";
import { faker } from "@faker-js/faker";
import { Routes } from "../../db/tables";

//TD is test data
export const routeTD = Sync.makeFactory<Routes>({
  id: faker.string.alphanumeric(5),
  route: faker.word.noun(),
  slug: faker.word.noun({ length: 3 }),
});
