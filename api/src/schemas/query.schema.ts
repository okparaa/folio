import * as v from "valibot";

export const RequestQuerySchema = v.object({
  l: v.optional(v.string(), "100"),
  o: v.optional(v.string(), "0"),
});
