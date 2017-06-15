"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require("jsonwebtoken");
const TEN_MINUTES = '10m';
class JwtSignProcessor {
    static sign(payload, globalSecretKey) {
        let signedToken = '';
        let validationStatus = globalSecretKey && payload;
        if (!validationStatus) {
            throw new Error('Invalid Global Secret Key (or) Payload Specified!');
        }
        signedToken = JWT.sign(payload, globalSecretKey, {
            expiresIn: TEN_MINUTES
        });
        return signedToken;
    }
}
exports.default = JwtSignProcessor;
