"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = void 0;
var node_postgres_1 = require("drizzle-orm/node-postgres");
var pg_1 = require("pg");
var schema = require("./tables");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.client = new pg_1.Client({
    connectionString: process.env.DATABASE_TEST_URL,
});
exports.client.connect();
exports.db = (0, node_postgres_1.drizzle)(exports.client, { schema: schema, logger: false });
