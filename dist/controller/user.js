"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfileImage = exports.loginUser = exports.registerUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const joi_1 = __importDefault(require("joi"));
const user_1 = __importDefault(require("../model/user"));
const bcryptjs_1 = require("bcryptjs");
const token_1 = require("../util/token");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
{ /* create validation schema for login with joi*/ }
const createUserSchema = joi_1.default.object({
    password: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
});
{ /* create validation schema for registeration with joi*/ }
const createRegisterSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    full_name: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
{ /*Route: /api/users/register */ }
{ /*Request Type: POST */ }
const registerUser = async (req, res) => {
    { /* accept parameters from body */ }
    const { full_name, username, email, password } = req.body;
    { /* use joi to validate parameters */ }
    const { error } = createRegisterSchema.validate({ username, email, full_name, password });
    { /* notifying user with error message if there is an error */ }
    if (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }
    const gen = await (0, bcryptjs_1.genSalt)(10);
    const hashPassword = await (0, bcryptjs_1.hash)(password, gen);
    { /* proceed to querying api for the provided email */ }
    await user_1.default.create({ email: email, password: hashPassword, username: username, full_name })
        .then(async () => {
        { /* notify user */ }
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            'msg': 'user successfully enrolled',
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
exports.registerUser = registerUser;
{ /*Route: /api/users/login */ }
{ /*Request Type: POST */ }
const loginUser = async (req, res) => {
    { /* accept parameters from body */ }
    const { email, password } = req.body;
    { /* use joi to validate parameters */ }
    const { error } = createUserSchema.validate({ email, password });
    { /* notifying user with error message if there is an error */ }
    if (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }
    { /* proceed to querying api for the provided email */ }
    await user_1.default.findOne({ where: { email: email } })
        .then(async (result) => {
        { /* upon email verified, compare the hashed password with the provided password */ }
        const checkPass = await (0, bcryptjs_1.compare)(password, result.dataValues.password);
        { /* check whether the password check is passed */ }
        if (checkPass) {
            { /* notify user of the successful login and token */ }
            res.status(http_status_codes_1.StatusCodes.OK).json({
                'token': (0, token_1.generateToken)(result.dataValues.id),
                'msg': 'login success',
                'status': http_status_codes_1.StatusCodes.OK
            });
        }
    })
        .catch((error) => {
        { /* upon error, notify the user of the error encountered */ }
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            'msg': `an error occured: ${error}`
        });
    });
};
exports.loginUser = loginUser;
{ /*Route: /api/users/upload-user-image */ }
{ /*Request Type: POST */ }
const uploadProfileImage = async (req, res) => {
    await cloudinary_1.default.uploader.upload('profile')
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
exports.uploadProfileImage = uploadProfileImage;
