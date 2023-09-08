"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const index_1 = require("../config/index");
const generateToken = (id) => {
    return (0, jsonwebtoken_1.sign)({ id }, index_1.JWT_SECRET, { expiresIn: "30d" });
};
exports.generateToken = generateToken;
