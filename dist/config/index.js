"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PORT = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USER = exports.DB_NAME = exports.PORT = exports.EMAIL = exports.JWT_SECRET = exports.PASSWORD = exports.ACCESS_TOKEN = exports.REFRESH_TOKEN = exports.CLIENT_SECRET = exports.CLIENT_ID = exports.CLOUD_API_SECRET = exports.CLOUD_API_KEY = exports.CLOUD_NAME = exports.NODE_ENV = exports.TERMIL_API_KEY = exports.CREDENTIALS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.CREDENTIALS = process.env.CREDENTIALS === "true";
_a = process.env, exports.TERMIL_API_KEY = _a.TERMIL_API_KEY, exports.NODE_ENV = _a.NODE_ENV, exports.CLOUD_NAME = _a.CLOUD_NAME, exports.CLOUD_API_KEY = _a.CLOUD_API_KEY, exports.CLOUD_API_SECRET = _a.CLOUD_API_SECRET, exports.CLIENT_ID = _a.CLIENT_ID, exports.CLIENT_SECRET = _a.CLIENT_SECRET, exports.REFRESH_TOKEN = _a.REFRESH_TOKEN, exports.ACCESS_TOKEN = _a.ACCESS_TOKEN, exports.PASSWORD = _a.PASSWORD, exports.JWT_SECRET = _a.JWT_SECRET, exports.EMAIL = _a.EMAIL, exports.PORT = _a.PORT, exports.DB_NAME = _a.DB_NAME, exports.DB_USER = _a.DB_USER, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_HOST = _a.DB_HOST, exports.DB_PORT = _a.DB_PORT;
