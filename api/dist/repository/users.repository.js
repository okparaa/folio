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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const _1 = require(".");
const error_utils_1 = require("../utils/error.utils");
class UsersRepository extends _1.Repository {
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username) {
                return (0, error_utils_1.throwErr)("Username is required");
            }
            try {
                const result = yield this.db.execute((0, drizzle_orm_1.sql) `SELECT * FROM ${this.table} WHERE username = ${username}`);
                if (result.rowCount === 0) {
                    return (0, error_utils_1.throwErr)("User not found");
                }
                return result.rows[0];
            }
            catch (error) {
                throw new Error(error.message ||
                    "An error occurred while retrieving the user");
            }
        });
    }
}
exports.UsersRepository = UsersRepository;
