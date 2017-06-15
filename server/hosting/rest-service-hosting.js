"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");
const socketio = require("socket.io");
const http_status_codes_1 = require("../utilities/http-status-codes");
const userprofile_routing_1 = require("../routing/userprofile-routing");
const customer_routing_1 = require("../routing/customer-routing");
const cors_processor_1 = require("../utilities/cors-processor");
const random_generator_1 = require("../utilities/random-generator");
const DEFAULT_PORT = 9090;
const DEFAULT_GLOBAL_SECRET_KEY = 'Yash Technologies, Hyderabad';
class RestServiceHost {
    constructor() {
        this.portNumber = process.env.PORT_NUMBER || DEFAULT_PORT;
        this.globalSecretKey =
            process.env.GLOBAL_SECRET_KEY || DEFAULT_GLOBAL_SECRET_KEY;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.sioServer = socketio.listen(this.httpServer);
        this.customerRouting = new customer_routing_1.default(this.sioServer);
        this.userProfileRouting = new userprofile_routing_1.default(this.globalSecretKey);
        this.initializeMiddleware();
    }
    handleAuthorizationError(error, request, response, next) {
        if (error && error.constructor.name === 'UnauthorizedError') {
            response.status(http_status_codes_1.default.CLIENT_ERROR).json({
                status: 'Authorization Failed'
            });
            return;
        }
        next();
    }
    initializeMiddleware() {
        this.sioServer.on('connection', socketClient => {
            let socketClientId = random_generator_1.default.generate();
            socketClient.client.id = socketClientId.toString();
            console.log(`Socket Client ${socketClient.client.id} Connected ...`);
            socketClient.on('disconnect', () => {
                console.log(`Socket Client ${socketClient.client.id} Disconnected ...`);
            });
        });
        this.app.use(morgan("tiny"));
        this.app.use(this.handleAuthorizationError);
        this.app.use(cors_processor_1.default.applyCors);
        this.app.use('/api/customers', expressJwt({
            secret: this.globalSecretKey
        }));
        this.app.use(bodyParser.json());
        this.app.use('/api/customers', this.customerRouting.Router);
        this.app.use('/authenticate', this.userProfileRouting.Router);
        let staticWebFolder = __dirname + "/../../client";
        this.app.use('/', express.static(staticWebFolder));
    }
    start() {
        let promise = new Promise((resolve, reject) => {
            this.httpServer.listen(this.portNumber, () => {
                resolve(true);
            });
        });
        return promise;
    }
    stop() {
        let promise = new Promise((resolve, reject) => {
            if (this.httpServer.listening) {
                this.httpServer.close(() => resolve(true));
            }
        });
        return promise;
    }
}
exports.default = RestServiceHost;
