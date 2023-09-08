"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const user_1 = require("../controller/user");
const storage = multer_1.default.memoryStorage(); // Store the uploaded file in memory
const upload = (0, multer_1.default)({ storage: storage });
class UserRoute {
    constructor() {
        this.path = "/users";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(this.path + "/upload-user-image", upload.single('image'), user_1.uploadProfileImage);
        this.router.post(this.path + "/register", user_1.registerUser);
        this.router.post(this.path + "/login", user_1.loginUser);
    }
}
exports.default = UserRoute;
