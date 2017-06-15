"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CorsProcessor {
    static applyCors(request, response, next) {
        if (response) {
            response.header('Access-Control-Allow-Credentials', 'true');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Methods', '*');
            response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        }
    }
}
exports.default = CorsProcessor;
