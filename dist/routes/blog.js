"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const blog_1 = require("../controller/blog");
const comment_1 = require("../controller/comment");
const protect_1 = require("../util/protect");
const storage = multer_1.default.memoryStorage(); // Store the uploaded file in memory
const upload = (0, multer_1.default)({ storage: storage });
class BlogRoute {
    constructor() {
        this.path = "/api/posts";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        { /* posts routes */ }
        this.router.post(this.path + "/upload-post-image", upload.single('post'), blog_1.uploadPostImage);
        this.router.post(this.path + "/", protect_1.protect, blog_1.addPost);
        this.router.patch(this.path + "/:postId/soft", protect_1.protect, blog_1.softDeletePost);
        this.router.delete(this.path + "/:postId/hard", protect_1.protect, blog_1.hardDeletePost);
        this.router.get(this.path + "/:postId", protect_1.protect, blog_1.retrievePostByID);
        this.router.get(this.path + "/", protect_1.protect, blog_1.retrievePosts);
        this.router.get(this.path + "/single/posts", protect_1.protect, blog_1.retrieveMyPosts);
        this.router.patch(this.path + "/:postId", protect_1.protect, blog_1.updatePost);
        { /* comments routes */ }
        this.router.post(this.path + "/:postId/post/comments", protect_1.protect, comment_1.addComment);
        this.router.delete(this.path + "/:postId/:commentId", protect_1.protect, comment_1.deleteComment);
        this.router.get(this.path + "/:postId/:commentId", protect_1.protect, comment_1.retrieveSpecificComment);
        this.router.get(this.path + "/:commentId/post/comments", protect_1.protect, comment_1.retrieveComments);
        this.router.patch(this.path + "/:postId/:commentId/post/comments", protect_1.protect, comment_1.updateComment);
    }
}
exports.default = BlogRoute;
