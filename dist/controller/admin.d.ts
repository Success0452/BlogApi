import { Request, Response } from 'express';
export declare const createAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const postAdminInfo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const allStatistics: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const toggleUserPostAccess: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deletePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
