"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const customer_routing_1 = require("../routing/customer-routing");
const DEFAULT_PORT = 9090;
class RestServiceHost {
    constructor() {
        this.portNumber = process.env.PORT_NUMBER || DEFAULT_PORT;
        this.customerRouting = new customer_routing_1.default();
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.initializeMiddleware();
    }
    initializeMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use('/api/customers', this.customerRouting.Router);
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
