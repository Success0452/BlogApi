import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import UserModel from '../model/user';
import { generateToken } from '../util/token';
import cloudinary from '../config/cloudinary';
import PostModel from '../model/blog';
import CommentModel from '../model/comment';

{/* create validation schema for addComment with joi*/}
const addPostSchema = Joi.object({
    text: Joi.string().required()
});

{/*Route: /api/posts/:postId/comments */}
{/*Request Type: GET */}
export const retrieveComments = async(req: Request, res: Response) => {
    const userId = req.headers.id as string;
    const {commentId} = req.params;


    const user = await UserModel.findByPk(userId);

    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    await CommentModel.findAll({where: {id: commentId}})
    .then(
        async(result) => {
            {/* notify user */}
            res.status(StatusCodes.OK).json({
                'msg': 'comment retrieved',
                'status': StatusCodes.OK,
                'comment': result
            });
    })
    .catch((error) => {
        {/* upon error, notify the user of the error encountered */}
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve post: ${error}`
        });
    });;
}

{/*Route: /api/posts/:postId/:commentId */}
{/*Request Type: GET */}
export const retrieveSpecificComment = async(req: Request, res: Response) => {

    const userId = req.headers.id as string;
    const {postId, commentId} = req.params;


    const user = await UserModel.findByPk(userId);

    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    const post = await PostModel.findOne({where: {id: postId}});

    if(!post){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve post`
        });
    }

    const comment = await CommentModel.findOne({where: {id: commentId}});

    if(!comment){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve comment`
        });
    }

    {/* proceed to querying api for the provided email */}
    await CommentModel.findOne({where: {id: comment.dataValues.id}})
    .then(
        async(result) => {
            {/* notify user */}
            res.status(StatusCodes.OK).json({
                'msg': 'comment retrieved',
                'status': StatusCodes.OK,
                'comment': result
            });
    })
    .catch((error) => {
        {/* upon error, notify the user of the error encountered */}
        res.status(StatusCodes.BAD_GATEWAY).json({ 
            'msg': `an error occured: ${error}`
        });
    });
}

{/*Route: /api/posts/:postId/comments */}
{/*Request Type: POST */}
export const addComment = async(req: Request, res: Response) => {
    const userId = req.headers.id as string;
    const {postId} = req.params;


    const user = await UserModel.findByPk(userId);

    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    const post = await PostModel.findOne({where: {id: postId}});

    if(!post){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve post`
        });
    }

    {/* accept parameters from body */}
    const { text, image } = req.body;

    {/* use joi to validate parameters */}
    const { error } = addPostSchema.validate({ text });

    {/* notifying user with error message if there is an error */}
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }

    {/* proceed to querying api for the provided email */}
    await CommentModel.create({ text: text, image: image, userId: user?.dataValues.id, postId: post.dataValues.id })
    .then(
      async() => {
            {/* notify user */}
        res.status(StatusCodes.OK).json({
            'msg': 'comment added',
            'status': StatusCodes.OK
        });
    })
    .catch((error) => {
        {/* upon error, notify the user of the error encountered */}
        res.status(StatusCodes.BAD_GATEWAY).json({ 
            'msg': `an error occured: ${error}`
        });
    });
}

{/*Route: /api/posts/:postId/:commentId */}
{/*Request Type: PATCH */}
export const updateComment = async(req: Request, res: Response) => {
    const userId = req.headers.id as string;
    const {postId, commentId} = req.params;


    const user = await UserModel.findByPk(userId);

    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    const post = await PostModel.findOne({where: {id: postId}});

    if(!post){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve post`
        });
    }

    const comment = await CommentModel.findOne({where: {id: commentId}});

    if(!comment){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve comment`
        });
    }

    {/* accept parameters from body */}
    const { text } = req.body;

    {/* use joi to validate parameters */}
    const { error } = addPostSchema.validate({ text });

    {/* notifying user with error message if there is an error */}
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 'msg': error.details[0].message });
    }

    {/* proceed to querying api for the provided email */}
    await CommentModel.update({ text: text}, {where: {id: comment?.dataValues.id}})
    .then(
        async() => {
            {/* notify user */}
            res.status(StatusCodes.OK).json({
                'msg': 'comment updated',
                'status': StatusCodes.OK
            });
    })
    .catch((error) => {
        {/* upon error, notify the user of the error encountered */}
        res.status(StatusCodes.BAD_GATEWAY).json({ 
            'msg': `an error occured: ${error}`
        });
    });
}

{/*Route: /api/posts/:postId/:commentId */}
{/*Request Type: DELETE */}
export const deleteComment = async(req: Request, res: Response) => {
    const userId = req.headers.id as string;
    const {postId, commentId} = req.params;


    const user = await UserModel.findByPk(userId);

    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `user is not logged in`
        });
    }

    const post = await PostModel.findOne({where: {id: postId}});

    if(!post){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve post`
        });
    }

    const comment = await CommentModel.findOne({where: {id: commentId}});

    if(!comment){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve comment`
        });
    }

    if(comment?.dataValues.userId !== user?.dataValues.id){
        return res.status(StatusCodes.NOT_FOUND).json({ 
            'msg': `unable to retrieve comment`
        });
    }

    {/* proceed to querying api for the provided email */}
    await CommentModel.destroy({where: {id: comment.dataValues.id}})
    .then(
        async() => {
            {/* notify user */}
            res.status(StatusCodes.OK).json({
                'msg': 'comment deleted',
                'status': StatusCodes.OK
            });
    })
    .catch((error) => {
        {/* upon error, notify the user of the error encountered */}
        res.status(StatusCodes.BAD_GATEWAY).json({ 
            'msg': `an error occured: ${error}`
        });
    });
}
