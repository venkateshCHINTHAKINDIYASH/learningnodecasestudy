"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const DEFAULT_DB_SERVER_NAME = 'localhost';
const DEFAULT_PORT_NUMBER = 27017;
const DEFAULT_DB_NAME = 'yashcrmsystemdb';
class MongoConnectionInitializer {
    constructor(databaseServerName = DEFAULT_DB_SERVER_NAME, portNumber = DEFAULT_PORT_NUMBER, databaseName = DEFAULT_DB_NAME) {
        this.databaseServerName = databaseServerName;
        this.portNumber = portNumber;
        this.databaseName = databaseName;
        let connectionString = `mongodb://${databaseServerName}:${portNumber}/${databaseName}`;
        mongoose.connect(connectionString);
        // Change the default promise used by Mongoose to ES 2015 Promise Classes, rather
        // using in-built promises.
        mongoose.Promise = Promise;
    }
    get Connection() {
        return mongoose;
    }
    static getInstance() {
        if (typeof MongoConnectionInitializer.connectionInitializer === 'undefined') {
            MongoConnectionInitializer.connectionInitializer = new MongoConnectionInitializer();
        }
        return MongoConnectionInitializer.connectionInitializer;
    }
}
exports.default = MongoConnectionInitializer;
