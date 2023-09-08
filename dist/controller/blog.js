"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchForPost = exports.uploadPostImage = exports.hardDeletePost = exports.softDeletePost = exports.updatePost = exports.addPost = exports.retrievePostByID = exports.retrieveMyPosts = exports.retrievePosts = void 0;
const http_status_codes_1 = require("http-status-codes");
const joi_1 = __importDefault(require("joi"));
const user_1 = __importDefault(require("../model/user"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const blog_1 = __importDefault(require("../model/blog"));
const sequelize_1 = __importDefault(require("sequelize"));
{ /* create validation schema for addPost with joi*/ }
const addPostSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
});
{ /* create validation schema for addPost with joi*/ }
const searchSchema = joi_1.default.object({
    query: joi_1.default.string().required(),
});
{ /*Route: /api/posts */ }
{ /*Request Type: GET */ }
const retrievePosts = async (req, res) => {
    const userId = req.headers.id;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 14;
    const offset = (page - 1) * pageSize;
    { /* proceed to querying api for the provided email */ }
    await blog_1.default.findAll({ limit: pageSize, offset: offset, where: { is_deleted: false } })
        .then(async (result) => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'posts retrieved',
            'status': http_status_codes_1.StatusCodes.ACCEPTED,
            'posts': result
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.retrievePosts = retrievePosts;
{ /*Route: /api/my-posts */ }
{ /*Request Type: GET */ }
const retrieveMyPosts = async (req, res) => {
    const userId = req.headers.id;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 14;
    const offset = (page - 1) * pageSize;
    { /* proceed to querying api for the provided email */ }
    await blog_1.default.findAll({ limit: pageSize, offset: offset, where: { is_deleted: false, id: user?.dataValues.id } })
        .then(async (result) => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'posts retrieved',
            'status': http_status_codes_1.StatusCodes.ACCEPTED,
            'posts': result
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.retrieveMyPosts = retrieveMyPosts;
{ /*Route: /api/posts/:postId */ }
{ /*Request Type: GET */ }
const retrievePostByID = async (req, res) => {
    const userId = req.headers.id;
    const { postId } = req.params;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    console.log(postId);
    const post = await blog_1.default.findOne({ where: { id: postId } });
    if (!post) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve post`
        });
    }
    { /* proceed to querying api for the provided email */ }
    await blog_1.default.findByPk(post?.dataValues.id)
        .then(async (result) => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'posts retrieved',
            'status': http_status_codes_1.StatusCodes.ACCEPTED,
            'post': result?.dataValues
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.retrievePostByID = retrievePostByID;
{ /*Route: /api/posts */ }
{ /*Request Type: POST */ }
const addPost = async (req, res) => {
    const userId = req.headers.id;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    { /* accept parameters from body */ }
    const { title, content, image } = req.body;
    { /* use joi to validate parameters */ }
    const { error } = addPostSchema.validate({ title, content });
    { /* notifying user with error message if there is an error */ }
    if (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }
    { /* proceed to querying api for the provided email */ }
    await blog_1.default.create({ title: title, content: content, image: image, userId: user?.dataValues.id })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'post created',
            'status': http_status_codes_1.StatusCodes.ACCEPTED
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.addPost = addPost;
{ /*Route: /api/posts/:postId */ }
{ /*Request Type: PATCH */ }
const updatePost = async (req, res) => {
    const userId = req.headers.id;
    const { postId } = req.params;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    const post = await blog_1.default.findOne({ where: { id: postId } });
    if (!post) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve post`
        });
    }
    if (post?.dataValues.userId !== user?.dataValues.id) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            'msg': `unauthorized error: make sure you are the one that created the post`
        });
    }
    { /* accept parameters from body */ }
    const { content } = req.body;
    { /* use joi to validate parameters */ }
    const { error } = addPostSchema.validate({ content });
    { /* notifying user with error message if there is an error */ }
    if (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }
    { /* proceed to querying api for the provided email */ }
    await blog_1.default.update({ content: content }, { where: { id: post?.dataValues.id } })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'post updated',
            'status': http_status_codes_1.StatusCodes.ACCEPTED
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.updatePost = updatePost;
{ /*Route: /api/posts/:postId */ }
{ /*Request Type: PATCH */ }
const softDeletePost = async (req, res) => {
    const userId = req.headers.id;
    const { postId } = req.params;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    const post = await blog_1.default.findOne({ where: { id: postId } });
    if (!post) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve post`
        });
    }
    if (post?.dataValues.userId !== user?.dataValues.id) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            'msg': `unauthorized error: make sure you are the one that created the post`
        });
    }
    { /* proceed to querying api for the provided email */ }
    await blog_1.default.update({ is_deleted: true }, { where: { id: post?.dataValues.id } })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'post soft deleted',
            'status': http_status_codes_1.StatusCodes.ACCEPTED
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.softDeletePost = softDeletePost;
{ /*Route: /api/posts/:postId/hard */ }
{ /*Request Type: DELETE */ }
const hardDeletePost = async (req, res) => {
    const userId = req.headers.id;
    const { postId } = req.params;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    const post = await blog_1.default.findOne({ where: { id: postId } });
    if (!post) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve post`
        });
    }
    if (post?.dataValues.userId !== user?.dataValues.id) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            'msg': `unauthorized error: make sure you are the one that created the post`
        });
    }
    { /* proceed to querying api for the provided email */ }
    await blog_1.default.destroy({ where: { id: post?.dataValues.id } })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'post hard deleted',
            'status': http_status_codes_1.StatusCodes.ACCEPTED
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.hardDeletePost = hardDeletePost;
{ /*Route: /api/posts/upload-post-image */ }
{ /*Request Type: POST */ }
const uploadPostImage = async (req, res) => {
    await cloudinary_1.default.uploader.upload('posts')
        .then((result) => {
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'upload success',
            'status': http_status_codes_1.StatusCodes.ACCEPTED,
            url: result.url,
            public_id: result.public_id,
            type: result.type,
            filename: result.original_filename
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `upload occured: ${error}`
        });
    });
};
exports.uploadPostImage = uploadPostImage;
const searchForPost = async (req, res) => {
    const query = req.query.query;
    { /* use joi to validate parameters */ }
    const { error } = searchSchema.validate({ query });
    { /* notifying user with error message if there is an error */ }
    if (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }
    await blog_1.default.findAll({
        where: {
            [sequelize_1.default.Op.or]: [
                {
                    title: {
                        [sequelize_1.default.Op.iLike]: `%${query}%`,
                    },
                },
                {
                    content: {
                        [sequelize_1.default.Op.iLike]: `%${query}%`,
                    },
                },
            ],
        },
    }).then((result) => {
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'search success',
            'status': http_status_codes_1.StatusCodes.ACCEPTED,
            'data': result
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `error occured: ${error}`
        });
    });
    ;
};
exports.searchForPost = searchForPost;
