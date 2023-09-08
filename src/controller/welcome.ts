import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const welcome = (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        'msg': 'Welcome to Blog Api',
        'documentation': 'https://github.com/Success0452/BlogApi/blob/main/DOCUMENTATION.md',
        'status': StatusCodes.OK
    })
}