
import {StatusCodes } from 'http-status-codes';
import { Response, Request } from "express";

export const NotFound = (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).send("Route Not Found");
}
