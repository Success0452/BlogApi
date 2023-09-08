import {Router} from 'express';
import { IRoute } from "../interfaces/routes/route.interface";
import multer from 'multer';
import { 
    loginUser,
    registerUser,
    uploadProfileImage
} from '../controller/user';

const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage: storage });

class UserRoute implements IRoute {
    public path: string = "/api/users"
    public router: Router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.post(this.path + "/upload-user-image", upload.single('image'), uploadProfileImage);
        this.router.post(this.path + "/register", registerUser);
        this.router.post(this.path + "/login", loginUser);
    }
}


export default UserRoute
