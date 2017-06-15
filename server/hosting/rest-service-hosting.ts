import * as http from 'http';
import * as morgan from 'morgan';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressJwt from 'express-jwt';
import * as socketio from 'socket.io';

import HttpStatusCodes from '../utilities/http-status-codes';
import UserProfileRouting from '../routing/userprofile-routing';
import CustomerRouting from '../routing/customer-routing';
import CorsProcessor from '../utilities/cors-processor';
import RandomGenerator from '../utilities/random-generator';

const DEFAULT_PORT: number = 9090;
const DEFAULT_GLOBAL_SECRET_KEY: string = 'Yash Technologies, Hyderabad';

class RestServiceHost {
    private portNumber: number;
    private globalSecretKey: string;
    private httpServer: http.Server;
    private app: express.Express;
    private customerRouting: CustomerRouting;
    private userProfileRouting: UserProfileRouting;
    private sioServer: SocketIO.Server;

    constructor() {
        this.portNumber = process.env.PORT_NUMBER || DEFAULT_PORT;
        this.globalSecretKey =
            process.env.GLOBAL_SECRET_KEY || DEFAULT_GLOBAL_SECRET_KEY;

        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.sioServer = socketio.listen(this.httpServer);

        this.customerRouting = new CustomerRouting(this.sioServer);
        this.userProfileRouting = new UserProfileRouting(this.globalSecretKey);

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
        this.sioServer.on('connection', socketClient => {
            let socketClientId = RandomGenerator.generate();

            socketClient.client.id = socketClientId.toString();

            console.log(`Socket Client ${socketClient.client.id} Connected ...`);

            socketClient.on('disconnect', () => {
                console.log(`Socket Client ${socketClient.client.id} Disconnected ...`);
            });
        });

        this.app.use(morgan("tiny"));
        this.app.use(this.handleAuthorizationError);
        this.app.use(CorsProcessor.applyCors);

        this.app.use('/api/customers', expressJwt({
            secret: this.globalSecretKey
        }));

        this.app.use(bodyParser.json());
        this.app.use('/api/customers', this.customerRouting.Router);
        this.app.use('/authenticate', this.userProfileRouting.Router);

        let staticWebFolder = __dirname + "/../../client";

        this.app.use('/', express.static(staticWebFolder));
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
