"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { drizzle } = require("drizzle-orm/node-postgres");
const { migrate } = require("drizzle-orm/node-postgres/migrator");
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("migration started...");
        yield migrate(db, { migrationsFolder: "drizzle" });
        console.log("migration ended...");
        process.exit(0);
    });
}
main().catch((err) => {
    console.log(err);
    process.exit(0);
});
