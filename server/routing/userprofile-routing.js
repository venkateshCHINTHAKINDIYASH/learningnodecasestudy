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
const express = require("express");
const userprofile_service_1 = require("../services/userprofile-service");
const jwt_sign_processor_1 = require("../utilities/jwt-sign-processor");
const http_status_codes_1 = require("../utilities/http-status-codes");
const NULLIFY_PASSWORD = '';
const AUTH_FAILURE = 'Authentication Failure';
class UserProfileRouting {
    constructor(globalSecretKey) {
        this.globalSecretKey = globalSecretKey;
        this.userProfileService = new userprofile_service_1.default();
        this.router = express.Router();
        this.initializeRouting();
    }
    initializeRouting() {
        this.router.post('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let bodyContent = request.body;
            let validation = bodyContent && bodyContent.userId &&
                bodyContent.password;
            if (!validation) {
                response.status(http_status_codes_1.default.CLIENT_ERROR);
                return;
            }
            let userId = bodyContent.userId;
            let password = bodyContent.password;
            try {
                let validationStatus = yield this.userProfileService.validate(userId, password);
                if (validationStatus) {
                    let userProfile = yield this.userProfileService.getUserProfile(userId);
                    userProfile.password = NULLIFY_PASSWORD;
                    let signedToken = jwt_sign_processor_1.default.sign(userProfile, this.globalSecretKey);
                    response.status(http_status_codes_1.default.OK).json({
                        token: signedToken
                    });
                }
            }
            catch (error) {
                console.log('Error Occurred : ' + error);
                response.status(http_status_codes_1.default.CLIENT_ERROR).json(AUTH_FAILURE);
            }
        }));
    }
    get Router() {
        return this.router;
    }
}
exports.default = UserProfileRouting;
