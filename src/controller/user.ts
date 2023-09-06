import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import UserModel from '../model/user';
import {compare, genSalt, hash} from 'bcryptjs'; 
import { generateToken } from '../util/token';
import cloudinary from '../config/cloudinary';


{/* create validation schema for login with joi*/}
const createUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

{/* create validation schema for registeration with joi*/}
const createRegisterSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    full_name: Joi.string().required(),
    password: Joi.string().required(),
});

{/*Route: /api/users/register */}
{/*Request Type: POST */}
export const registerUser = async(req: Request, res: Response) => {
 
    {/* accept parameters from body */}
    const { full_name, username, email, password } = req.body;

    {/* use joi to validate parameters */}
    const { error } = createRegisterSchema.validate({ username, email, full_name, password });

    {/* notifying user with error message if there is an error */}
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }

    const gen = await genSalt(10);
    const hashPassword = await hash(password, gen);

    {/* proceed to querying api for the provided email */}
    await UserModel.create({ email: email, password: hashPassword, username: username, full_name })
    .then(
        async() => {
            {/* notify user */}
            res.status(StatusCodes.ACCEPTED).json({
                'msg': 'user successfully enrolled',
                'status': StatusCodes.ACCEPTED
            });
    })
    .catch((error) => {
        {/* upon error, notify the user of the error encountered */}
        res.status(StatusCodes.BAD_GATEWAY).json({ 
            'msg': `an error occured: ${error}`
        });
    });

}

{/*Route: /api/users/login */}
{/*Request Type: POST */}
export const loginUser = async(req: Request, res: Response) => {

    {/* accept parameters from body */}
    const { email, password } = req.body;

    {/* use joi to validate parameters */}
    const { error } = createUserSchema.validate({ email, password });

    {/* notifying user with error message if there is an error */}
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }

    {/* proceed to querying api for the provided email */}
    await UserModel.findOne({ where: {email: email} })
    .then(
        async(result) => {
        {/* upon email verified, compare the hashed password with the provided password */}
        const checkPass = await compare(password, result!.dataValues.password);

        {/* check whether the password check is passed */}
        if(checkPass){
            {/* notify user of the successful login and token */}
            res.status(StatusCodes.OK).json({ 
                'token': generateToken(result!.dataValues.id),
                'msg': 'login success',
                'status': StatusCodes.OK
            });
         }
    })
    .catch((error) => {
        {/* upon error, notify the user of the error encountered */}
        res.status(StatusCodes.BAD_GATEWAY).json({ 
            'msg': `an error occured: ${error}`
        });
    });
}

{/*Route: /api/users/upload-user-image */}
{/*Request Type: POST */}
export const uploadProfileImage = async(req: Request, res: Response) => {
        await cloudinary.uploader.upload('profile')
        .then((result) => {
            res.status(StatusCodes.ACCEPTED).json({ 
                'msg': 'upload success',
                'status': StatusCodes.ACCEPTED,
                url: result.url, 
                public_id: result.public_id, 
                type: result.type, 
                filename: result.original_filename
            });
        })
        .catch((error) => {
            {/* upon error, notify the user of the error encountered */}
            res.status(StatusCodes.BAD_GATEWAY).json({ 
                'msg': `upload occured: ${error}`
            });
        });
}