import {Router} from 'express';
import { IRoute } from "../interfaces/routes/route.interface";
import multer from 'multer';
import { 
    allStatistics,
    deletePost,
    postAdminInfo,
    toggleUserPostAccess,
    verifyUser
} from '../controller/admin';

import {protect} from '../util/protect'

class AdminRoute implements IRoute {
    public path: string = "/admin"
    public router: Router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        {/* posts routes */}
        this.router.post(this.path + "/", protect, postAdminInfo);
        this.router.delete(this.path + "/delete/:id", protect, deletePost);
        this.router.patch(this.path + "/:id", protect, toggleUserPostAccess);
        this.router.patch(this.path + "/verify/:id", protect, verifyUser);
        this.router.get(this.path + "/", protect, allStatistics);
    }
}


export default AdminRoute
