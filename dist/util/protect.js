"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../config/index");
const user_1 = __importDefault(require("../model/user"));
const protect = async (req, res, next) => {
    let token;
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: "Invalid authorization format" });
    }
    token = auth.split(' ')[1];
    console.log(token);
    const decode = (0, jsonwebtoken_1.verify)(token, index_1.JWT_SECRET);
    const convert = decode;
    const user = await user_1.default.findByPk(convert.id);
    if (user) {
        req.headers.id = user.dataValues.id;
        next();
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': 'invalid token' });
    }
};
exports.protect = protect;
