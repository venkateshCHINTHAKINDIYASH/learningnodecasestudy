"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_formatter_1 = require("../utilities/object-formatter");
class UserProfile {
    constructor(userId, password, email, department, title) {
        this.userId = userId;
        this.password = password;
        this.email = email;
        this.department = department;
        this.title = title;
    }
    toString() {
        return object_formatter_1.default.format(this);
    }
}
exports.default = UserProfile;
