import * as express from 'express';

class CorsProcessor {
    static applyCors(request: express.Request,
        response: express.Response, next: express.NextFunction) {
        if (response) {
            response.header('Access-Control-Allow-Credentials', 'true');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Methods', '*');
            response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

            next();
        }
    }
}

export default CorsProcessor;
