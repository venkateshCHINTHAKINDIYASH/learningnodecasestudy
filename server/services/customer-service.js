"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_schema_1 = require("../schemas/customer-schema");
class CustomerService {
    getCustomers() {
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let customers = yield customer_schema_1.default.find({}).exec();
                resolve(customers);
            }
            catch (error) {
                reject(error);
            }
        }));
        return promise;
    }
    getCustomer(customerId) {
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let filteredCustomer = yield customer_schema_1.default.findOne({
                    customerId: customerId
                }).exec();
                resolve(filteredCustomer);
            }
            catch (error) {
                reject(error);
            }
        }));
        return promise;
    }
    getCustomersByName(customerName) {
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let searchStringRegExp = new RegExp(customerName);
                let filteredCustomers = yield customer_schema_1.default.find({
                    name: searchStringRegExp
                }).exec();
                resolve(filteredCustomers);
            }
            catch (error) {
                reject(error);
            }
        }));
        return promise;
    }
    addNewCustomer(customer) {
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let newCustomerRecord = new customer_schema_1.default(customer);
                let savedCustomerRecord = yield newCustomerRecord.save();
                resolve(savedCustomerRecord);
            }
            catch (error) {
                reject(error);
            }
        }));
        return promise;
    }
}
exports.default = CustomerService;
