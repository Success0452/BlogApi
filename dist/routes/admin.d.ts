import { Router } from 'express';
import { IRoute } from "../interfaces/routes/route.interface";
declare class AdminRoute implements IRoute {
    path: string;
    router: Router;
    constructor();
    private initializeRoutes;
}
export default AdminRoute;
