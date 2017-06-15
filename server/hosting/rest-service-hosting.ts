import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import UserProfileRouting from '../routing/userprofile-routing';
import CustomerRouting from '../routing/customer-routing';
import CorsProcessor from '../utilities/cors-processor';

const DEFAULT_PORT: number = 9090;

class RestServiceHost {
    private portNumber: number = process.env.PORT_NUMBER || DEFAULT_PORT;
    private httpServer: http.Server;
    private app: express.Express;
    private customerRouting: CustomerRouting = new CustomerRouting();
    private userProfileRoutine: UserProfileRouting = new UserProfileRouting();

    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);

        this.initializeMiddleware();
    }

    private initializeMiddleware() {
        this.app.use(CorsProcessor.applyCors);
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
