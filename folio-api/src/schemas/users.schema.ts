import * as v from "valibot";
import { UsersService } from "../services/users.service";

const usersService = new UsersService();

export const BaseUserSchema = v.object({
  id: v.string(),
  surname: v.pipe(
    v.string("should be string"),
    v.nonEmpty("value is required"),
    v.maxLength(30, "surname too long")
  ),
  role: v.pipe(v.string("should be string"), v.nonEmpty("value is required")),
  firstname: v.pipe(
    v.string("should be string"),
    v.maxLength(30, "firstname too long")
  ),
  lastname: v.pipe(
    v.string("should be string"),
    v.nonEmpty("value is required"),
    v.maxLength(30, "lastname too long")
  ),
  photoUrl: v.string(),
});

export const UsersSchema = v.required(v.partial(BaseUserSchema), ["id"]);

export const SignupSchema = v.pipeAsync(
  v.objectAsync({
    ...v.omit(BaseUserSchema, ["id", "photoUrl", "role"]).entries,
    username: v.pipeAsync(
      v.string("email not string"),
      v.nonEmpty("email empty"),
      v.email("email badly formated"),
      v.maxLength(50, "email too long"),
      v.checkAsync(
        async (input) =>
          (await usersService.isUsernameAvailable(input)) as boolean,
        "username in use."
      )
    ),
    phone: v.pipeAsync(
      v.string("should be string"),
      v.regex(/[(080)|(081)][0-9]{9}/),
      v.checkAsync(
        async (input) =>
          (await usersService.isPhoneAvailable(input)) as boolean,
        "Phone number in use"
      )
    ),
    pass: v.pipe(
      v.string("should be string"),
      v.nonEmpty("value is empty"),
      v.maxLength(30, "password too long")
    ),
    password: v.pipe(
      v.string("should be string"),
      v.minLength(6, "password too short."),
      v.maxLength(30, "password too long.")
    ),
  }),
  v.forward(
    v.partialCheck(
      [["pass"], ["password"]],
      (input) => input.pass === input.password,
      "password missmatch."
    ),
    ["password"]
  )
);

export const SigninSchema = v.pipeAsync(
  v.object({
    username: v.pipe(
      v.string("should be string"),
      v.nonEmpty("value is required"),
      v.maxLength(50, "username too long")
    ),
    password: v.pipe(
      v.string("should be string"),
      v.nonEmpty("value is require"),
      v.maxLength(50, "password too long")
    ),
  }),
  v.forwardAsync(
    v.partialCheckAsync(
      [["username"], ["password"]],
      async (input) => (await usersService.verifyUser(input)) as boolean,
      "invalid credentials"
    ),
    ["username"]
  )
);

export type SigninSchemaType = { username: string; password: string };

export type User = { id: string; role: string };
