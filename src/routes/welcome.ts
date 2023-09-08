import {Router} from 'express';
import { IRoute } from "../interfaces/routes/route.interface";
import multer from 'multer';
import { 
    welcome
} from '../controller/welcome';

const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage: storage });

class WelcomeRoute implements IRoute {
    public path: string = ""
    public router: Router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get(this.path + "", welcome);
    }
}


export default WelcomeRoute
