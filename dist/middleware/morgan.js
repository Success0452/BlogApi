"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const loggers_1 = require("../config/loggers");
const stream = {
    write: (message) => loggers_1.logger.http(message.substring(0, message.lastIndexOf("\n")))
};
const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};
const morganMiddleware = (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms", { stream, skip });
exports.default = morganMiddleware;
