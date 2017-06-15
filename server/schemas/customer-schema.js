"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_connection_initializer_1 = require("../utilities/mongo-connection-initializer");
let Connection = mongo_connection_initializer_1.default.getInstance().Connection;
let Schema = Connection.Schema;
let CustomerSchema = new Schema({
    customerId: Number,
    name: String,
    address: String,
    email: String,
    phone: String,
    credit: Number,
    status: Boolean,
    remarks: String,
    blogUrl: String
});
let CustomerMappedModel = Connection.model('customers', CustomerSchema);
exports.default = CustomerMappedModel;
