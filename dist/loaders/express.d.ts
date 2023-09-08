import { Application } from 'express';
import { IRoute } from '../interfaces/routes/route.interface';
export default class ExpressLoader {
    app: Application;
    port: string | number;
    constructor(routes: IRoute[]);
    private initializeMiddlewares;
    private initializeRoutes;
    listen(): void;
}
