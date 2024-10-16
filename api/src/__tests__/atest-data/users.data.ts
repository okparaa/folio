import { Sync } from "factory.ts";
import { Users } from "../../db/tables";
import { faker } from "@faker-js/faker";
import { RequiredWith } from "../../types";
type PickedUser = Pick<
  Users,
  | "id"
  | "surname"
  | "phone"
  | "firstname"
  | "lastname"
  | "password"
  | "username"
  | "role"
  | "photoUrl"
>;
export const userTD = Sync.makeFactory<PickedUser>({
  id: faker.string.alphanumeric(5),
  surname: faker.person.middleName(),
  phone: faker.helpers.fromRegExp("081[0-9]{8}"),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  password: faker.internet.password(),
  username: faker.internet.email(),
  role: faker.string.alpha(4),
  photoUrl: "https://dummyimage.com",
});
