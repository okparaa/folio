import * as v from "valibot";

export const ContentSchema = v.object({
  id: v.string("id should be a string"),
  name: v.optional(v.string("name should be a string")),
  description: v.optional(v.string()),
  stock: v.optional(v.number("value must be a number")),
  price: v.pipe(
    v.optional(v.number("price shoud be a number")),
    v.check((input) => input === undefined || input === null || input > 0)
  ),
});

export const NewContentSchema = v.omit(ContentSchema, ["id"]);
