"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutesFile = exports.createId = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const file = path_1.default.join(__dirname, "tables.json");
const routes_file = path_1.default.join(__dirname, "routes.json");
const shuffle = (str, len) => {
    const start = Math.floor(Math.random() * (str.length - len));
    return str
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("")
        .substring(start, start + len);
};
const createId = (table) => {
    if (!fs_1.default.existsSync(file)) {
        fs_1.default.writeFileSync(file, "{}");
    }
    let tables = JSON.parse(fs_1.default.readFileSync(file).toString());
    if (!tables[table]) {
        tables[table] = 0;
    }
    const tableId = tables[table] + 1;
    tables[table] = tableId;
    const data = JSON.stringify(tables);
    fs_1.default.writeFileSync(file, data);
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const salt = shuffle(chars, 3);
    return tableId + salt;
};
exports.createId = createId;
const createRoutesFile = (inputs) => {
    const routes = JSON.parse("{}");
    console.log("write routes", inputs);
    inputs.forEach((input) => {
        routes[input.route] = input.slug;
    });
    if (!fs_1.default.existsSync(file)) {
        fs_1.default.writeFileSync(file, "{}");
    }
    fs_1.default.writeFileSync(routes_file, JSON.stringify(routes));
};
exports.createRoutesFile = createRoutesFile;
