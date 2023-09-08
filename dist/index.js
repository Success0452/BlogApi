"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// inject ExpressLoader to start up the app
const express_1 = __importDefault(require("./loaders/express"));
const admin_1 = __importDefault(require("./routes/admin"));
const blog_1 = __importDefault(require("./routes/blog"));
const user_1 = __importDefault(require("./routes/user"));
const app = new express_1.default([
    new user_1.default(),
    new blog_1.default(),
    new admin_1.default(),
]);
app.listen();
