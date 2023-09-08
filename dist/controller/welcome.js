"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = void 0;
const http_status_codes_1 = require("http-status-codes");
const welcome = (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({
        'msg': 'Welcome to Blog Api',
        'documentation': 'https://github.com/Success0452/BlogApi/blob/main/DOCUMENTATION.md',
        'status': http_status_codes_1.StatusCodes.OK
    });
};
exports.welcome = welcome;
