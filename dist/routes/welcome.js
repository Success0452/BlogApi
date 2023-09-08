"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const welcome_1 = require("../controller/welcome");
const storage = multer_1.default.memoryStorage(); // Store the uploaded file in memory
const upload = (0, multer_1.default)({ storage: storage });
class WelcomeRoute {
    constructor() {
        this.path = "";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path + "", welcome_1.welcome);
    }
}
exports.default = WelcomeRoute;
