"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const index_1 = require("./index");
cloudinary_1.v2.config({
    cloud_name: index_1.CLOUD_NAME,
    api_key: index_1.CLOUD_API_KEY,
    api_secret: index_1.CLOUD_API_SECRET,
});
exports.default = cloudinary_1.v2;
