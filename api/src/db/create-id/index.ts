import fs from "fs";
import path from "path";
const file = path.join(__dirname, "tables.json");
const routes_file = path.join(__dirname, "routes.json");

const shuffle = (str: string, len: number) => {
  const start = Math.floor(Math.random() * (str.length - len));

  return str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
    .substring(start, start + len);
};

export const createId = (table: string): string => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "{}");
  }

  let tables = JSON.parse(fs.readFileSync(file).toString());

  if (!tables[table]) {
    tables[table] = 0;
  }
  const tableId = tables[table] + 1;
  tables[table] = tableId;
  const data = JSON.stringify(tables);
  fs.writeFileSync(file, data);
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const salt = shuffle(chars, 3);
  return tableId + salt;
};

export const createRoutesFile = (
  inputs: { route: string; slug: string }[]
): void => {
  const routes = JSON.parse("{}");
  console.log("write routes", inputs);

  inputs.forEach((input) => {
    routes[input.route] = input.slug;
  });

  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "{}");
  }
  fs.writeFileSync(routes_file, JSON.stringify(routes));
};
