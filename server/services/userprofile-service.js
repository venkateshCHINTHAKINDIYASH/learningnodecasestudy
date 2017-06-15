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
const user_profile_1 = require("../models/user-profile");
class UserProfileService {
    constructor() {
        this.userProfiles = [];
        this.userProfiles = [
            new user_profile_1.default(1011, 'admin@123', 'info1@email.com', 'IT', 'Senior Manager'),
            new user_profile_1.default(1012, 'admin@123', 'info2@email.com', 'IT', 'Senior Clerk'),
            new user_profile_1.default(1013, 'admin@123', 'info3@email.com', 'IT', 'Senior Administrator'),
            new user_profile_1.default(1014, 'admin@123', 'info4@email.com', 'IT', 'Senior Associate'),
            new user_profile_1.default(1015, 'admin@123', 'info5@email.com', 'IT', 'Senior Engineer')
        ];
    }
    getUserProfile(userId) {
        let promise = new Promise((resolve, reject) => {
            let validation = false;
            let filteredUserProfile = null;
            for (let userProfile of this.userProfiles) {
                validation = userProfile &&
                    userProfile.userId === userId;
                if (validation) {
                    filteredUserProfile = userProfile;
                    break;
                }
            }
            if (filteredUserProfile) {
                resolve(filteredUserProfile);
            }
            else {
                reject({
                    status: validation
                });
            }
        });
        return promise;
    }
    validate(userId, password) {
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let filteredUserProfile = yield this.getUserProfile(userId);
            let validationStatus = filteredUserProfile &&
                filteredUserProfile.password === password;
            if (!validationStatus) {
                reject(validationStatus);
            }
            else {
                resolve(validationStatus);
            }
        }));
        return promise;
    }
}
exports.default = UserProfileService;
