import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressJwt from 'express-jwt';

import HttpStatusCodes from '../utilities/http-status-codes';
import UserProfileRouting from '../routing/userprofile-routing';
import CustomerRouting from '../routing/customer-routing';
import CorsProcessor from '../utilities/cors-processor';

const DEFAULT_PORT: number = 9090;
const DEFAULT_GLOBAL_SECRET_KEY: string = 'Yash Technologies, Hyderabad';

class RestServiceHost {
    private portNumber: number;
    private globalSecretKey: string;
    private httpServer: http.Server;
    private app: express.Express;
    private customerRouting: CustomerRouting;
    private userProfileRoutine: UserProfileRouting;

    constructor() {
        this.portNumber = process.env.PORT_NUMBER || DEFAULT_PORT;
        this.globalSecretKey =
            process.env.GLOBAL_SECRET_KEY || DEFAULT_GLOBAL_SECRET_KEY;
        this.customerRouting = new CustomerRouting();
        this.userProfileRoutine = new UserProfileRouting(this.globalSecretKey);

        this.app = express();
        this.httpServer = http.createServer(this.app);

        this.initializeMiddleware();
    }

    private handleAuthorizationError(
        error: any, request: express.Request,
        response: express.Response, next: express.NextFunction) {

        if (error && error.constructor.name === 'UnauthorizedError') {
            response.status(HttpStatusCodes.CLIENT_ERROR).json({
                status: 'Authorization Failed'
            });

            return;
        }

        next();
    }

    private initializeMiddleware() {
        this.app.use(this.handleAuthorizationError);
        this.app.use(CorsProcessor.applyCors);
        
        this.app.use('/api/customers', expressJwt({
            secret: this.globalSecretKey
        }));

        this.app.use(bodyParser.json());
        this.app.use('/api/customers', this.customerRouting.Router);
        this.app.use('/authenticate', this.userProfileRoutine.Router);
    }

    start(): Promise<boolean> {
        let promise = new Promise<boolean>(
            (resolve, reject) => {
                this.httpServer.listen(this.portNumber,
                    () => {
                        resolve(true);
                    });
            });

        return promise;
    }

    stop(): Promise<boolean> {
        let promise = new Promise<boolean>(
            (resolve, reject) => {
                if (this.httpServer.listening) {
                    this.httpServer.close(() => resolve(true));
                }
            });

        return promise;
    }
}

export default RestServiceHost;
