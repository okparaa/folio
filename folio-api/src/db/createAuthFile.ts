import { sql } from "drizzle-orm";
import { db } from ".";
import { createRoutesFile } from "./create-id";

async function createJsonAuthFile() {
  const routes = (
    await db.execute(sql`
        SELECT route, slug FROM routes;
        `)
  ).rows as { route: string; slug: string }[];
  createRoutesFile(routes);
}

createJsonAuthFile()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    process.exit(0);
  });
