import { Sync } from "factory.ts";
import { faker } from "@faker-js/faker";
import { Contents } from "../../db/tables";

export const contentTD = Sync.makeFactory<Contents>({
  content: faker.lorem.paragraphs(),
  title: faker.word.words({ count: 5 }),
});
