/* imports */
import express, {Response, Application} from 'express';
import compression from 'compression';
import {logger} from '../config/loggers';
import cors from 'cors';
import errorMiddleware from '../middleware/error-handler';
import { NotFound } from '../middleware/not-found';
import { IRoute } from '../interfaces/routes/route.interface';
import { PORT } from '../config/index';
import { initializeDatabase } from '../database/initial';

/* class to initiate express middlewares*/
export default class ExpressLoader{

    public app: Application;
    public port: string | number;

    constructor(routes: IRoute[]){
        this.app = express();

         /* ports variable */
        this.port = PORT || 3000;
        
        // initialize middlewares
        this.initializeMiddlewares();
        
        // initialize routes
        this.initializeRoutes(routes)
    }

    private initializeMiddlewares(): void {
        const corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
          };
          
          this.app.use(compression());
          this.app.use(express.json());
          this.app.use(cors(corsOptions));
          this.app.use(errorMiddleware);
          this.app.use(NotFound);
          this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(routes: IRoute[]): void {
        routes.forEach(route => {
            this.app.use("/api", route.router)
        })
    }  

     /* notify user of express start */
     public listen(): void {
         this.app.listen(this.port, async() => {
             initializeDatabase();
             logger.info(`Express running, now listening on port ${this.port}`);
             console.log(`⚡️Express running, now listening on port ${this.port}`);
         })
     }
}