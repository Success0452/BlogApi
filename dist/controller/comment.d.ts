import { Request, Response } from 'express';
export declare const retrieveComments: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const retrieveSpecificComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
