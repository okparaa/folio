"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutesFile = exports.createId = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var file = path_1.default.join(__dirname, "tables.json");
var routes_file = path_1.default.join(__dirname, "routes.json");
var shuffle = function (str, len) {
    var start = Math.floor(Math.random() * (str.length - len));
    return str
        .split("")
        .sort(function () { return Math.random() - 0.5; })
        .join("")
        .substring(start, start + len);
};
var createId = function (table) {
    if (!fs_1.default.existsSync(file)) {
        fs_1.default.writeFileSync(file, "{}");
    }
    var tables = JSON.parse(fs_1.default.readFileSync(file).toString());
    if (!tables[table]) {
        tables[table] = 0;
    }
    var tableId = tables[table] + 1;
    tables[table] = tableId;
    var data = JSON.stringify(tables);
    fs_1.default.writeFileSync(file, data);
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    var salt = shuffle(chars, 3);
    return tableId + salt;
};
exports.createId = createId;
var createRoutesFile = function (inputs) {
    var routes = JSON.parse("{}");
    console.log("write routes", inputs);
    inputs.forEach(function (input) {
        routes[input.route] = input.slug;
    });
    if (!fs_1.default.existsSync(file)) {
        fs_1.default.writeFileSync(file, "{}");
    }
    fs_1.default.writeFileSync(routes_file, JSON.stringify(routes));
};
exports.createRoutesFile = createRoutesFile;
