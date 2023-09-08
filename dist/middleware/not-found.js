"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const http_status_codes_1 = require("http-status-codes");
const NotFound = (req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send("Route Not Found");
};
exports.NotFound = NotFound;
