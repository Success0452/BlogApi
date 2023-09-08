import { Router } from 'express';
import { IRoute } from "../interfaces/routes/route.interface";
declare class WelcomeRoute implements IRoute {
    path: string;
    router: Router;
    constructor();
    private initializeRoutes;
}
export default WelcomeRoute;
