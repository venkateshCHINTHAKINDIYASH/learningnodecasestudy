import * as express from 'express';

import UserProfileService from '../services/userprofile-service';
import JwtSignProcessor from '../utilities/jwt-sign-processor';
import HttpStatusCodes from '../utilities/http-status-codes';

const NULLIFY_PASSWORD: string = '';
const AUTH_FAILURE: string = 'Authentication Failure';

class UserProfileRouting {
    private router: express.Router;
    private userProfileService: UserProfileService = new UserProfileService();

    constructor(public globalSecretKey: string) {
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
                        let userProfile = await this.userProfileService.getUserProfile(userId);

                        userProfile.password = NULLIFY_PASSWORD;

                        let signedToken = JwtSignProcessor.sign(userProfile, this.globalSecretKey);

                        response.status(HttpStatusCodes.OK).json({
                            token: signedToken
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
