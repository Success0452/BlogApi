"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.addComment = exports.retrieveSpecificComment = exports.retrieveComments = void 0;
const http_status_codes_1 = require("http-status-codes");
const joi_1 = __importDefault(require("joi"));
const user_1 = __importDefault(require("../model/user"));
const blog_1 = __importDefault(require("../model/blog"));
const comment_1 = __importDefault(require("../model/comment"));
{ /* create validation schema for addComment with joi*/ }
const addPostSchema = joi_1.default.object({
    text: joi_1.default.string().required()
});
{ /*Route: /api/posts/:postId/comments */ }
{ /*Request Type: GET */ }
const retrieveComments = async (req, res) => {
    const userId = req.headers.id;
    const { commentId } = req.params;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    await comment_1.default.findAll({ where: { id: commentId } })
        .then(async (result) => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            'msg': 'comment retrieved',
            'status': http_status_codes_1.StatusCodes.OK,
            'comment': result
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve post: ${error}`
        });
    });
    ;
};
exports.retrieveComments = retrieveComments;
{ /*Route: /api/posts/:postId/:commentId */ }
{ /*Request Type: GET */ }
const retrieveSpecificComment = async (req, res) => {
    const userId = req.headers.id;
    const { postId, commentId } = req.params;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    const post = await blog_1.default.findOne({ where: { id: postId } });
    if (!post) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve post`
        });
    }
    const comment = await comment_1.default.findOne({ where: { id: commentId } });
    if (!comment) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve comment`
        });
    }
    { /* proceed to querying api for the provided email */ }
    await comment_1.default.findOne({ where: { id: comment.dataValues.id } })
        .then(async (result) => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            'msg': 'comment retrieved',
            'status': http_status_codes_1.StatusCodes.OK,
            'comment': result
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.retrieveSpecificComment = retrieveSpecificComment;
{ /*Route: /api/posts/:postId/comments */ }
{ /*Request Type: POST */ }
const addComment = async (req, res) => {
    const userId = req.headers.id;
    const { postId } = req.params;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    const post = await blog_1.default.findOne({ where: { id: postId } });
    if (!post) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve post`
        });
    }
    { /* accept parameters from body */ }
    const { text, image } = req.body;
    { /* use joi to validate parameters */ }
    const { error } = addPostSchema.validate({ text });
    { /* notifying user with error message if there is an error */ }
    if (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }
    { /* proceed to querying api for the provided email */ }
    await comment_1.default.create({ text: text, image: image, userId: user?.dataValues.id, postId: post.dataValues.id })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            'msg': 'comment added',
            'status': http_status_codes_1.StatusCodes.OK
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.addComment = addComment;
{ /*Route: /api/posts/:postId/:commentId */ }
{ /*Request Type: PATCH */ }
const updateComment = async (req, res) => {
    const userId = req.headers.id;
    const { postId, commentId } = req.params;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    const post = await blog_1.default.findOne({ where: { id: postId } });
    if (!post) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve post`
        });
    }
    const comment = await comment_1.default.findOne({ where: { id: commentId } });
    if (!comment) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve comment`
        });
    }
    { /* accept parameters from body */ }
    const { text } = req.body;
    { /* use joi to validate parameters */ }
    const { error } = addPostSchema.validate({ text });
    { /* notifying user with error message if there is an error */ }
    if (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }
    { /* proceed to querying api for the provided email */ }
    await comment_1.default.update({ text: text }, { where: { id: comment?.dataValues.id } })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            'msg': 'comment updated',
            'status': http_status_codes_1.StatusCodes.OK
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.updateComment = updateComment;
{ /*Route: /api/posts/:postId/:commentId */ }
{ /*Request Type: DELETE */ }
const deleteComment = async (req, res) => {
    const userId = req.headers.id;
    const { postId, commentId } = req.params;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    const post = await blog_1.default.findOne({ where: { id: postId } });
    if (!post) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve post`
        });
    }
    const comment = await comment_1.default.findOne({ where: { id: commentId } });
    if (!comment) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve comment`
        });
    }
    if (comment?.dataValues.userId !== user?.dataValues.id) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `unable to retrieve comment`
        });
    }
    { /* proceed to querying api for the provided email */ }
    await comment_1.default.destroy({ where: { id: comment.dataValues.id } })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            'msg': 'comment deleted',
            'status': http_status_codes_1.StatusCodes.OK
        });
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.deleteComment = deleteComment;
