import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import UserModel from '../model/user';
import { generateToken } from '../util/token';
import cloudinary from '../config/cloudinary';
import PostModel from '../model/blog';
import sequelize from 'sequelize';

{/* create validation schema for addPost with joi*/}
const addPostSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});

{/* create validation schema for addPost with joi*/}
const searchSchema = Joi.object({
    query: Joi.string().required(),
});

{/*Route: /api/posts */}
{/*Request Type: GET */}
export const retrievePosts = async(req: Request, res: Response) => {
    const userId = req.headers.id as string;

    const user = await UserModel.findByPk(userId);

    if(!user){
        res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    const page = parseInt(req.query.page as string) || 1; 
    const pageSize = parseInt(req.query.pageSize as string) || 14;

    const offset = (page - 1) * pageSize; 

    {/* proceed to querying api for the provided email */}
    await PostModel.findAll({ limit: pageSize, offset: offset, where: { is_deleted: false }})
    .then(
        async(result) => {
            {/* notify user */}
            res.status(StatusCodes.ACCEPTED).json({
                'msg': 'posts retrieved',
                'status': StatusCodes.ACCEPTED,
                'posts': result
            });
    })
    .catch((error) => {
        {/* upon error, notify the user of the error encountered */}
        res.status(StatusCodes.BAD_GATEWAY).json({ 
            'msg': `an error occured: ${error}`
        });
    });
}

{/*Route: /api/my-posts */}
{/*Request Type: GET */}
export const retrieveMyPosts = async(req: Request, res: Response) => {
    const userId = req.headers.id as string;

    const user = await UserModel.findByPk(userId);

    if(!user){
        res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    const page = parseInt(req.query.page as string) || 1; 
    const pageSize = parseInt(req.query.pageSize as string) || 14;

    const offset = (page - 1) * pageSize; 

    {/* proceed to querying api for the provided email */}
    await PostModel.findAll({ limit: pageSize, offset: offset, where: { is_deleted: false, id: user?.dataValues.id}})
    .then(
        async(result) => {
            {/* notify user */}
            res.status(StatusCodes.ACCEPTED).json({
                'msg': 'posts retrieved',
                'status': StatusCodes.ACCEPTED,
                'posts': result
            });
    })
    .catch((error) => {
        {/* upon error, notify the user of the error encountered */}
        res.status(StatusCodes.BAD_GATEWAY).json({ 
            'msg': `an error occured: ${error}`
        });
    });
}

{/*Route: /api/posts/:postId */}
{/*Request Type: GET */}
export const retrievePostByID = async(req: Request, res: Response) => {
    const userId = req.headers.id as string;
    const {postId} = req.params;

    const user = await UserModel.findByPk(userId);

    if(!user){
        res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    console.log(postId)

    const post = await PostModel.findOne({where: {id: postId}});

    if(!post){
        res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve post`
        });
    }

    {/* proceed to querying api for the provided email */}
    await PostModel.findByPk(post?.dataValues.id)
    .then(
        async(result) => {
            {/* notify user */}
            res.status(StatusCodes.ACCEPTED).json({
                'msg': 'posts retrieved',
                'status': StatusCodes.ACCEPTED,
                'post': result?.dataValues
            });
    })
    .catch((error) => {
        {/* upon error, notify the user of the error encountered */}
        res.status(StatusCodes.BAD_GATEWAY).json({ 
            'msg': `an error occured: ${error}`
        });
    });
}

{/*Route: /api/posts */}
{/*Request Type: POST */}
export const addPost = async(req: Request, res: Response) => {
    const userId = req.headers.id as string;

    const user = await UserModel.findByPk(userId);

    if(!user){
        res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    {/* accept parameters from body */}
    const { title, content, image } = req.body;

    {/* use joi to validate parameters */}
    const { error } = addPostSchema.validate({ title, content });

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
                'msg': 'post created',
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

{/*Route: /api/posts/:postId */}
{/*Request Type: PATCH */}
export const updatePost = async(req: Request, res: Response) => {
    const userId = req.headers.id as string;
    const {postId} = req.params;

    const user = await UserModel.findByPk(userId);

    if(!user){
        res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    const post = await PostModel.findOne({where: {id: postId}});

    if(!post){
        res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve post`
        });
    }

    if(post?.dataValues.userId !== user?.dataValues.id){
        res.status(StatusCodes.UNAUTHORIZED).json({ 
            'msg': `unauthorized error: make sure you are the one that created the post`
        });
    }

    {/* accept parameters from body */}
    const { content } = req.body;

    {/* use joi to validate parameters */}
    const { error } = addPostSchema.validate({ content });

    {/* notifying user with error message if there is an error */}
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }

    {/* proceed to querying api for the provided email */}
    await PostModel.update({content: content}, {where: {id: post?.dataValues.id}})
    .then(
        async() => {
            {/* notify user */}
            res.status(StatusCodes.ACCEPTED).json({
                'msg': 'post updated',
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

{/*Route: /api/posts/:postId */}
{/*Request Type: PATCH */}
export const softDeletePost = async(req: Request, res: Response) => {

    const userId = req.headers.id as string;
    const {postId} = req.params;

    const user = await UserModel.findByPk(userId);

    if(!user){
        res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    const post = await PostModel.findOne({where: {id: postId}});

    if(!post){
        res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve post`
        });
    }

    if(post?.dataValues.userId !== user?.dataValues.id){
        res.status(StatusCodes.UNAUTHORIZED).json({ 
            'msg': `unauthorized error: make sure you are the one that created the post`
        });
    }

    {/* proceed to querying api for the provided email */}
    await PostModel.update({is_deleted: true}, {where: {id: post?.dataValues.id}})
    .then(
        async() => {
            {/* notify user */}
            res.status(StatusCodes.ACCEPTED).json({
                'msg': 'post soft deleted',
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

{/*Route: /api/posts/:postId/hard */}
{/*Request Type: DELETE */}
export const hardDeletePost = async(req: Request, res: Response) => {

    const userId = req.headers.id as string;
    const {postId} = req.params;

    const user = await UserModel.findByPk(userId);

    if(!user){
        res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    const post = await PostModel.findOne({where: {id: postId}});

    if(!post){
        res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve post`
        });
    }

    if(post?.dataValues.userId !== user?.dataValues.id){
        res.status(StatusCodes.UNAUTHORIZED).json({ 
            'msg': `unauthorized error: make sure you are the one that created the post`
        });
    }

    {/* proceed to querying api for the provided email */}
    await PostModel.destroy({where: {id: post?.dataValues.id}})
    .then(
        async() => {
            {/* notify user */}
            res.status(StatusCodes.ACCEPTED).json({
                'msg': 'post hard deleted',
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

{/*Route: /api/posts/upload-post-image */}
{/*Request Type: POST */}
export const uploadPostImage = async(req: Request, res: Response) => {
    await cloudinary.uploader.upload('posts')
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

export const searchForPost = async(req: Request, res: Response) => {
        const query = req.query.query as string;

        {/* use joi to validate parameters */}
         const { error } = searchSchema.validate({ query });

        {/* notifying user with error message if there is an error */}
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
        }
    
        await PostModel.findAll({
          where: {
            [sequelize.Op.or]: [
              {
                title: {
                  [sequelize.Op.iLike]: `%${query}%`,
                },
              },
              {
                content: {
                  [sequelize.Op.iLike]: `%${query}%`,
                },
              },
            ],
          },
        }).then((result) => {
            res.status(StatusCodes.ACCEPTED).json({ 
                'msg': 'search success',
                'status': StatusCodes.ACCEPTED,
                'data': result
            });
        })
        .catch((error) => {
            {/* upon error, notify the user of the error encountered */}
            res.status(StatusCodes.BAD_GATEWAY).json({ 
                'msg': `error occured: ${error}`
            });
        });;
}