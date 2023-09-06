
import { verify } from 'jsonwebtoken';
import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { JWT_SECRET } from "../config/index";
import UserModel from '../model/user';
import { Protect } from '../interfaces/protect';


export const protect = async(req: Request, res: Response, next: NextFunction) => {
    let token;
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Invalid authorization format"})
    }

    token = auth.split(' ')[1]

    console.log(token)

    const decode = verify(token, JWT_SECRET!);
    const convert = decode as Protect;

    const user = await UserModel.findByPk(convert.id);

    if(user){
        req.headers.id = user.dataValues.id;
        next();
    }else{
        res.status(StatusCodes.BAD_REQUEST).json({'msg': 'invalid token'})
    }
}
