"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controller/admin");
const protect_1 = require("../util/protect");
class AdminRoute {
    constructor() {
        this.path = "/admin";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        { /* posts routes */ }
        this.router.post(this.path + "/", protect_1.protect, admin_1.postAdminInfo);
        this.router.delete(this.path + "/delete/:id", protect_1.protect, admin_1.deletePost);
        this.router.patch(this.path + "/:id", protect_1.protect, admin_1.toggleUserPostAccess);
        this.router.get(this.path + "/", protect_1.protect, admin_1.allStatistics);
    }
}
exports.default = AdminRoute;
