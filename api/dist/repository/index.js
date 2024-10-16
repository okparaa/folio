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
exports.Repository = void 0;
const db_1 = require("../db");
const drizzle_orm_1 = require("drizzle-orm");
class Repository {
    constructor(table, base = db_1.db) {
        this.db = base;
        this.table = table;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.db.insert(this.table).values(data).returning();
            return result;
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.db
                .update(this.table)
                .set(data)
                .where((0, drizzle_orm_1.eq)(this.table.id, data.id))
                .returning();
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.db
                .delete(this.table)
                .where((0, drizzle_orm_1.eq)(this.table.id, id))
                .returning();
            return result;
        });
    }
    find(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.select().from(this.table).limit(limit).offset(offset);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.db
                .select()
                .from(this.table)
                .where((0, drizzle_orm_1.eq)(this.table.id, id));
            return result;
        });
    }
}
exports.Repository = Repository;
