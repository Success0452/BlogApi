import { Router } from 'express';
import { IRoute } from "../interfaces/routes/route.interface";
declare class BlogRoute implements IRoute {
    path: string;
    router: Router;
    constructor();
    private initializeRoutes;
}
export default BlogRoute;
