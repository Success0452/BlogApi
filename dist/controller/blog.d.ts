import { Request, Response } from 'express';
export declare const retrievePosts: (req: Request, res: Response) => Promise<void>;
export declare const retrieveMyPosts: (req: Request, res: Response) => Promise<void>;
export declare const retrievePostByID: (req: Request, res: Response) => Promise<void>;
export declare const addPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updatePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const softDeletePost: (req: Request, res: Response) => Promise<void>;
export declare const hardDeletePost: (req: Request, res: Response) => Promise<void>;
export declare const uploadPostImage: (req: Request, res: Response) => Promise<void>;
export declare const searchForPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;