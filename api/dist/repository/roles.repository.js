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
exports.RolesRepository = void 0;
const _1 = require(".");
const drizzle_orm_1 = require("drizzle-orm");
const error_utils_1 = require("../utils/error.utils");
class RolesRepository extends _1.Repository {
    addRolePermissions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.roleId)
                return (0, error_utils_1.throwErr)("role id not provided for permissions");
            if (!data.permissions.length)
                return (0, error_utils_1.throwErr)("permissions is required");
            return yield this.db.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const results = [];
                data.permissions.forEach((permit) => __awaiter(this, void 0, void 0, function* () {
                    yield tx.execute((0, drizzle_orm_1.sql) `
      UPDATE roles SET permissions = ARRAY_APPEND(permissions, ${permit}) where id = ${data.roleId}`);
                    results.push(permit);
                }));
                return results;
            }));
        });
    }
    removeRolePermissions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.roleId)
                return (0, error_utils_1.throwErr)("role id not provided for permissions");
            if (!data.permissions.length)
                return (0, error_utils_1.throwErr)("permissions not provided");
            return yield this.db.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const results = [];
                data.permissions.forEach((permit) => __awaiter(this, void 0, void 0, function* () {
                    const resp = yield tx.execute((0, drizzle_orm_1.sql) `
      UPDATE roles SET permissions = ARRAY_REMOVE(permissions, ${permit}) where id = ${data.roleId} RETURNING *`);
                    results.push(permit);
                }));
                return results;
            }));
        });
    }
    findByRoleName(role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!role) {
                return (0, error_utils_1.throwErr)("role name is empty");
            }
            const result = yield this.db.execute((0, drizzle_orm_1.sql) `
        SELECT permissions from ${this.table} where role = ${role}; 
        `);
            if (result.rowCount === 0)
                return (0, error_utils_1.throwErr)("role does not exist");
            return result.rows[0];
        });
    }
}
exports.RolesRepository = RolesRepository;
