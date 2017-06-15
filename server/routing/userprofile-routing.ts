import * as express from 'express';

import HttpStatusCodes from '../utilities/http-status-codes';
import UserProfileService from '../services/userprofile-service';

const AUTH_FAILURE: string = 'Authentication Failure';

class UserProfileRouting {
    private router: express.Router;
    private userProfileService: UserProfileService = new UserProfileService();

    constructor() {
        this.router = express.Router();
        this.initializeRouting();
    }

    private initializeRouting() {
        this.router.post('/',
            async (request: express.Request, response: express.Response) => {
                let bodyContent = request.body;

                let validation = bodyContent && bodyContent.userId &&
                    bodyContent.password;

                if (!validation) {
                    response.status(HttpStatusCodes.CLIENT_ERROR);
                    return;
                }

                let userId = bodyContent.userId;
                let password = bodyContent.password;

                try {
                    let validationStatus = await this.userProfileService.validate(userId, password);

                    if (validationStatus) {
                        response.status(HttpStatusCodes.OK).json({
                            status: true
                        });
                    }
                } catch (error) {
                    response.status(HttpStatusCodes.CLIENT_ERROR).json(AUTH_FAILURE);
                }
            });
    }

    get Router() {
        return this.router;
    }
}

export default UserProfileRouting;
