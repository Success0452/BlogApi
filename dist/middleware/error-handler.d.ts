import { NextFunction, Request, Response } from "express";
import HttpException from "../util/exception";
declare const errorMiddleware: (error: HttpException, req: Request, res: Response, next: NextFunction) => void;
export default errorMiddleware;
