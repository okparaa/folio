"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = void 0;
const headers = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Control-Type");
    next();
};
exports.headers = headers;
