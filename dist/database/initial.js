"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const index_1 = __importDefault(require("./index"));
async function initializeDatabase() {
    try {
        await index_1.default.authenticate();
        await index_1.default.sync();
        console.log('Database connection established and models synced.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
exports.initializeDatabase = initializeDatabase;
