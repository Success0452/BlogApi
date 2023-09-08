"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* imports */
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const loggers_1 = require("../config/loggers");
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = __importDefault(require("../middleware/error-handler"));
const index_1 = require("../config/index");
const initial_1 = require("../database/initial");
/* class to initiate express middlewares*/
class ExpressLoader {
    constructor(routes) {
        this.app = (0, express_1.default)();
        /* ports variable */
        this.port = index_1.PORT || 3000;
        // initialize middlewares
        this.initializeMiddlewares();
        // initialize routes
        this.initializeRoutes(routes);
    }
    initializeMiddlewares() {
        const corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
        };
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use(error_handler_1.default);
        //   this.app.use(NotFound);
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use("/", route.router);
        });
    }
    /* notify user of express start */
    listen() {
        this.app.listen(this.port, async () => {
            (0, initial_1.initializeDatabase)();
            loggers_1.logger.info(`Express running, now listening on port ${this.port}`);
            console.log(`⚡️Express running, now listening on port ${this.port}`);
        });
    }
}
exports.default = ExpressLoader;
