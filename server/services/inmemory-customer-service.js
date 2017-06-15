"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internet_customer_1 = require("../models/internet-customer");
const DEFAULT_TIMEOUT_PERIOD = 1000;
const FOUND_INDEX_POS = 0;
const MIN_CREDIT_LIMIT = 1000;
class InMemoryCustomerService {
    constructor() {
        this.customers = [];
        this.customers =
            [
                new internet_customer_1.default(11, 'Northwind Traders', 'Bangalore', 'info@ntw.com', '080-4089343', 23000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new internet_customer_1.default(12, 'Southwind Traders', 'Bangalore', 'info@ntw.com', '080-4089343', 23000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new internet_customer_1.default(13, 'Eastwind Traders', 'Bangalore', 'info@ntw.com', '080-4089343', 23000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new internet_customer_1.default(14, 'Westwind Traders', 'Mangalore', 'info@ntw.com', '080-4089343', 13000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new internet_customer_1.default(15, 'Oxyrich Traders', 'Mysore', 'info@ntw.com', '080-4089343', 23000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new internet_customer_1.default(16, 'Adventureworks', 'Bangalore', 'info@ntw.com', '080-4089343', 33000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new internet_customer_1.default(17, 'Footmart', 'Bangalore', 'info@ntw.com', '080-4089343', 23000, false, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new internet_customer_1.default(18, 'ePublishers', 'Hyderabad', 'info@ntw.com', '080-4089343', 43000, false, 'Simple Customer Record', 'http://blogs.msdn.com/nwt')
            ];
    }
    getCustomers() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.customers);
            }, DEFAULT_TIMEOUT_PERIOD);
        });
        return promise;
    }
    getCustomer(customerId) {
        let promise = new Promise((resolve, reject) => {
            let validation = false;
            let filteredCustomer = null;
            for (let customer of this.customers) {
                if (customer && customer.customerId === customerId) {
                    validation = true;
                    filteredCustomer = customer;
                    break;
                }
            }
            if (!validation) {
                reject({
                    status: false
                });
                return;
            }
            if (typeof filteredCustomer !== 'undefined')
                resolve(filteredCustomer);
        });
        return promise;
    }
    getCustomersByName(customerName) {
        let promise = new Promise((resolve, reject) => {
            let filteredCustomers = this.customers.filter(customer => {
                let validation = customer &&
                    typeof customer.name !== 'undefined' &&
                    customer.name.indexOf(customerName) >= FOUND_INDEX_POS;
                return validation;
            });
            resolve(filteredCustomers);
        });
        return promise;
    }
    addNewCustomer(customer) {
        let promise = new Promise((resolve, reject) => {
            let validation = customer &&
                customer.name && typeof customer.credit !== 'undefined' &&
                customer.credit >= MIN_CREDIT_LIMIT;
            if (!validation) {
                reject({
                    status: false
                });
                return;
            }
            this.customers.push(customer);
            resolve(customer);
        });
        return promise;
    }
}
exports.default = InMemoryCustomerService;
