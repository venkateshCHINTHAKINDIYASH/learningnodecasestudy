"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const internet_customer_1 = require("../models/internet-customer");
const customer_service_1 = require("../services/customer-service");
const http_status_codes_1 = require("../utilities/http-status-codes");
const INVALID_SOCKET_SERVER_SPECIFIED = 'Invalid Socket Server Specified!';
const NEW_CUSTOMER_EVENT = 'NewCustomerRecord';
class CustomerRouting {
    constructor(socketServer) {
        this.socketServer = socketServer;
        this.customerService = new customer_service_1.default();
        if (!this.socketServer) {
            throw new Error(INVALID_SOCKET_SERVER_SPECIFIED);
        }
        this.router = express.Router();
        this.initializeRouting();
    }
    initializeRouting() {
        this.router.get('/', (request, response) => {
            this.customerService
                .getCustomers()
                .then(result => response.status(http_status_codes_1.default.OK).json(result))
                .catch(error => response.status(http_status_codes_1.default.CLIENT_ERROR));
        });
        this.router.get('/:customerId', (request, response) => {
            let parsedCustomerId = parseInt(request.params.customerId);
            this.customerService.getCustomer(parsedCustomerId)
                .then(result => response.status(http_status_codes_1.default.OK).json(result))
                .catch(error => response.status(http_status_codes_1.default.CLIENT_ERROR));
        });
        this.router.get('/search/:customerName', (request, response) => {
            let searchString = request.params.customerName;
            this.customerService.getCustomersByName(searchString)
                .then(result => response.status(http_status_codes_1.default.OK).json(result))
                .catch(error => response.status(http_status_codes_1.default.CLIENT_ERROR));
        });
        this.router.post('/', (request, response) => {
            let customer = request.body;
            customer.__proto__ = new internet_customer_1.default;
            this.customerService.addNewCustomer(customer)
                .then(result => {
                this.socketServer.emit(NEW_CUSTOMER_EVENT, result);
                response.status(http_status_codes_1.default.OK).json(result);
            })
                .catch(error => response.status(http_status_codes_1.default.CLIENT_ERROR));
        });
    }
    get Router() {
        return this.router;
    }
}
exports.default = CustomerRouting;
