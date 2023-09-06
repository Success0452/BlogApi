import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import UserModel from '../model/user';
import {compare, genSalt, hash} from 'bcryptjs'; 
import { generateToken } from '../util/token';
import PostModel from '../model/blog';
import CommentModel from '../model/comment';


{/* create validation schema for registeration with joi*/}
const Schema = Joi.object({
    content: Joi.string().required(),
    postId: Joi.string().email().required(),
    id: Joi.string().required(),
    title: Joi.string().required(),
    password: Joi.string().required(),
    full_name: Joi.string().required(),
    email: Joi.string().required(),
    username: Joi.string().required(),
});

{/*Route: /api/admin/create */}
{/*Request Type: POST */}
export const createAdmin = async(req: Request, res: Response) => {

    const userId = req.headers.id as string;

    const user = await UserModel.findByPk(userId);

    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    if(user?.dataValues.role !== 'admin'){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not an admin`
        });
    }

    {/* accept parameters from body */}
    const { full_name, username, email, password } = req.body;

    {/* use joi to validate parameters */}
    const { error } = Schema.validate({ username, email, full_name, password });

    {/* notifying user with error message if there is an error */}
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }

    const gen = await genSalt(10);
    const hashPassword = await hash(password, gen);

    {/* proceed to querying api for the provided email */}
    await UserModel.create({ email: email, password: hashPassword, username: username, full_name, role: 'admin' })
    .then(
        async() => {
            {/* notify user */}
            res.status(StatusCodes.ACCEPTED).json({
                'msg': 'admin created successfully enrolled',
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

{/*Route: /api/admin */}
{/*Request Type: POST */}
export const postAdminInfo = async(req: Request, res: Response) => {

    const userId = req.headers.id as string;

    const user = await UserModel.findByPk(userId);

    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    if(user?.dataValues.role !== 'admin'){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not an admin`
        });
    }

    {/* accept parameters from body */}
    const { title, content, image } = req.body;

    {/* use joi to validate parameters */}
    const { error } = Schema.validate({ title, content });

    {/* notifying user with error message if there is an error */}
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }

    {/* proceed to querying api for the provided email */}
    await PostModel.create({ title: title, content: content, image: image, userId: user?.dataValues.id })
    .then(
        async() => {
            {/* notify user */}
            res.status(StatusCodes.ACCEPTED).json({
                'msg': 'admin post created',
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


{/*Route: /api/admin */}
{/*Request Type: GET */}
export const allStatistics = async(req: Request, res: Response) => {

    const userId = req.headers.id as string;

    const user = await UserModel.findByPk(userId);

    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    if(user?.dataValues.role !== 'admin'){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not an admin`
        });
    }

    try{
        const userCount = await UserModel.count();
        const blogPostCount = await PostModel.count();
        const commentCount = await CommentModel.count();

        res.status(StatusCodes.ACCEPTED).json({
            'msg': 'user successfully enrolled',
            'status': StatusCodes.ACCEPTED,
            'noOfUser': userCount,
            'noOfPost': blogPostCount,
            'noOfComment': commentCount
        });
    }catch(error){
        {/* upon error, notify the user of the error encountered */}
        res.status(StatusCodes.BAD_GATEWAY).json({ 
            'msg': `an error occured: ${error}`
        });
    }

}


{/*Route: /api/admin/toggle/:id */}
{/*Request Type: POST */}
export const toggleUserPostAccess = async(req: Request, res: Response) => {

    const userId = req.headers.id as string;

    const user = await UserModel.findByPk(userId);

    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    if(user?.dataValues.role !== 'admin'){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not an admin`
        });
    }

    {/* accept parameters from body */}
    const { id } = req.params;

    {/* use joi to validate parameters */}
    const { error } = Schema.validate({ id });

    {/* notifying user with error message if there is an error */}
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }

    const access = await UserModel.findByPk(id)

    await UserModel.update({ access: ! !access?.dataValues.access}, {where: {id: id}})
    .then(
        async() => {
            {/* notify user */}
            res.status(StatusCodes.ACCEPTED).json({
                'msg': 'request processed',
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

{/*Route: /api/admin/delete/:postId */}
{/*Request Type: DELETE */}
export const deletePost = async(req: Request, res: Response) => {

    const userId = req.headers.id as string;

    const user = await UserModel.findByPk(userId);

    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    if(user?.dataValues.role !== 'admin'){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not an admin`
        });
    }

    {/* accept parameters from body */}
    const { postId } = req.params;

    {/* use joi to validate parameters */}
    const { error } = Schema.validate({ postId });

    {/* notifying user with error message if there is an error */}
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }

    {/* proceed to querying api for the provided email */}
    await PostModel.destroy({where: {id: postId}})
    .then(
        async() => {
            {/* notify user */}
            res.status(StatusCodes.ACCEPTED).json({
                'msg': 'post deleted',
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
