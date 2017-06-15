"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");
const http_status_codes_1 = require("../utilities/http-status-codes");
const userprofile_routing_1 = require("../routing/userprofile-routing");
const customer_routing_1 = require("../routing/customer-routing");
const cors_processor_1 = require("../utilities/cors-processor");
const DEFAULT_PORT = 9090;
const DEFAULT_GLOBAL_SECRET_KEY = 'Yash Technologies, Hyderabad';
class RestServiceHost {
    constructor() {
        this.portNumber = process.env.PORT_NUMBER || DEFAULT_PORT;
        this.globalSecretKey =
            process.env.GLOBAL_SECRET_KEY || DEFAULT_GLOBAL_SECRET_KEY;
        this.customerRouting = new customer_routing_1.default();
        this.userProfileRoutine = new userprofile_routing_1.default(this.globalSecretKey);
        this.app = express();
        this.httpServer = http.createServer(this.app);
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
        this.app.use(this.handleAuthorizationError);
        this.app.use(cors_processor_1.default.applyCors);
        this.app.use('/api/customers', expressJwt({
            secret: this.globalSecretKey
        }));
        this.app.use(bodyParser.json());
        this.app.use('/api/customers', this.customerRouting.Router);
        this.app.use('/authenticate', this.userProfileRoutine.Router);
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
