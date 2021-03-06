"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_service_hosting_1 = require("./hosting/rest-service-hosting");
let host = new rest_service_hosting_1.default();
host.start()
    .then(result => console.log('REST Service Successfully Started ...'));
process.on('exit', () => {
    console.log('exiting ...');
    host.stop()
        .then(result => {
        console.log('REST Service Stopped!');
        process.exit();
    });
});
process.on('SIGINT', () => {
    host.stop()
        .then(result => {
        console.log('REST Service Stopped!');
        process.exit();
    });
});
