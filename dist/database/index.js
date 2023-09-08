"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../config/index");
const pg_1 = require("pg");
const dialect = 'postgres';
const sequelize = new sequelize_1.Sequelize({
    dialect,
    host: index_1.DB_HOST,
    port: 5432,
    username: index_1.DB_USER,
    password: index_1.DB_PASSWORD,
    database: index_1.DB_NAME,
});
exports.client = new pg_1.Client({
    host: index_1.DB_HOST,
    user: index_1.DB_USER,
    port: 5432,
    password: index_1.DB_PASSWORD,
    database: index_1.DB_NAME
});
exports.default = sequelize;
