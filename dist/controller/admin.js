"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.toggleUserPostAccess = exports.allStatistics = exports.postAdminInfo = exports.createAdmin = void 0;
const http_status_codes_1 = require("http-status-codes");
const joi_1 = __importDefault(require("joi"));
const user_1 = __importDefault(require("../model/user"));
const bcryptjs_1 = require("bcryptjs");
const blog_1 = __importDefault(require("../model/blog"));
const comment_1 = __importDefault(require("../model/comment"));
{ /* create validation schema for registeration with joi*/ }
const Schema = joi_1.default.object({
    content: joi_1.default.string().required(),
    postId: joi_1.default.string().email().required(),
    id: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    full_name: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
});
{ /*Route: /api/admin/create */ }
{ /*Request Type: POST */ }
const createAdmin = async (req, res) => {
    const userId = req.headers.id;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    if (user?.dataValues.role !== 'admin') {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not an admin`
        });
    }
    { /* accept parameters from body */ }
    const { full_name, username, email, password } = req.body;
    { /* use joi to validate parameters */ }
    const { error } = Schema.validate({ username, email, full_name, password });
    { /* notifying user with error message if there is an error */ }
    if (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }
    const gen = await (0, bcryptjs_1.genSalt)(10);
    const hashPassword = await (0, bcryptjs_1.hash)(password, gen);
    { /* proceed to querying api for the provided email */ }
    await user_1.default.create({ email: email, password: hashPassword, username: username, full_name, role: 'admin' })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'admin created successfully enrolled',
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
exports.createAdmin = createAdmin;
{ /*Route: /api/admin */ }
{ /*Request Type: POST */ }
const postAdminInfo = async (req, res) => {
    const userId = req.headers.id;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    if (user?.dataValues.role !== 'admin') {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not an admin`
        });
    }
    { /* accept parameters from body */ }
    const { title, content, image } = req.body;
    { /* use joi to validate parameters */ }
    const { error } = Schema.validate({ title, content });
    { /* notifying user with error message if there is an error */ }
    if (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }
    { /* proceed to querying api for the provided email */ }
    await blog_1.default.create({ title: title, content: content, image: image, userId: user?.dataValues.id })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'admin post created',
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
exports.postAdminInfo = postAdminInfo;
{ /*Route: /api/admin */ }
{ /*Request Type: GET */ }
const allStatistics = async (req, res) => {
    const userId = req.headers.id;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    if (user?.dataValues.role !== 'admin') {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not an admin`
        });
    }
    try {
        const userCount = await user_1.default.count();
        const blogPostCount = await blog_1.default.count();
        const commentCount = await comment_1.default.count();
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'user successfully enrolled',
            'status': http_status_codes_1.StatusCodes.ACCEPTED,
            'noOfUser': userCount,
            'noOfPost': blogPostCount,
            'noOfComment': commentCount
        });
    }
    catch (error) {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    }
};
exports.allStatistics = allStatistics;
{ /*Route: /api/admin/toggle/:id */ }
{ /*Request Type: POST */ }
const toggleUserPostAccess = async (req, res) => {
    const userId = req.headers.id;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    if (user?.dataValues.role !== 'admin') {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not an admin`
        });
    }
    { /* accept parameters from body */ }
    const { id } = req.params;
    { /* use joi to validate parameters */ }
    const { error } = Schema.validate({ id });
    { /* notifying user with error message if there is an error */ }
    if (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }
    const access = await user_1.default.findByPk(id);
    await user_1.default.update({ access: !!access?.dataValues.access }, { where: { id: id } })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'request processed',
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
exports.toggleUserPostAccess = toggleUserPostAccess;
{ /*Route: /api/admin/delete/:postId */ }
{ /*Request Type: DELETE */ }
const deletePost = async (req, res) => {
    const userId = req.headers.id;
    const user = await user_1.default.findByPk(userId);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not logged in`
        });
    }
    if (user?.dataValues.role !== 'admin') {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            'msg': `user is not an admin`
        });
    }
    { /* accept parameters from body */ }
    const { postId } = req.params;
    { /* use joi to validate parameters */ }
    const { error } = Schema.validate({ postId });
    { /* notifying user with error message if there is an error */ }
    if (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }
    { /* proceed to querying api for the provided email */ }
    await blog_1.default.destroy({ where: { id: postId } })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'post deleted',
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
exports.deletePost = deletePost;
