"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("./customer");
class InternetCustomer extends customer_1.default {
    constructor(customerId, name, address, email, phoneNumber, credit, status, remarks, blogUrl) {
        super(customerId, name, address, email, phoneNumber, credit, status, remarks);
        this.customerId = customerId;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.credit = credit;
        this.status = status;
        this.remarks = remarks;
        this.blogUrl = blogUrl;
    }
    toString() {
        return super.toString().toUpperCase();
    }
}
exports.default = InternetCustomer;
