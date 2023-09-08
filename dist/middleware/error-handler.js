"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggers_1 = require("../config/loggers");
const errorMiddleware = (error, req, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message || "Something went wrong";
        loggers_1.logger.error(`[${req.method}] ${req.path}  >> StatusCode:: ${status}, Message:: ${message}`);
        res.status(status).json({ message });
    }
    catch (error) {
        next(error);
    }
};
exports.default = errorMiddleware;
