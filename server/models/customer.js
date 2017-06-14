"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_formatter_1 = require("../utilities/object-formatter");
class Customer {
    constructor(customerId, name, address, email, phoneNumber, credit, status, remarks) {
        this.customerId = customerId;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.credit = credit;
        this.status = status;
        this.remarks = remarks;
    }
    toString() {
        return object_formatter_1.default.format(this);
    }
}
exports.default = Customer;
