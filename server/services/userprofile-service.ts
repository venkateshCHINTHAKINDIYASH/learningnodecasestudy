import UserProfile from '../models/user-profile';
import IUserProfileService from './iuserprofile-service';

class UserProfileService implements IUserProfileService {
    private userProfiles: UserProfile[] = [];

    constructor() {
        this.userProfiles = [
            new UserProfile(1011, 'admin@123', 'info1@email.com', 'IT', 'Senior Manager'),
            new UserProfile(1012, 'admin@123', 'info2@email.com', 'IT', 'Senior Clerk'),
            new UserProfile(1013, 'admin@123', 'info3@email.com', 'IT', 'Senior Administrator'),
            new UserProfile(1014, 'admin@123', 'info4@email.com', 'IT', 'Senior Associate'),
            new UserProfile(1015, 'admin@123', 'info5@email.com', 'IT', 'Senior Engineer')
        ];
    }

    getUserProfile(userId: number): Promise<UserProfile> {
        let promise = new Promise<UserProfile>(
            (resolve, reject) => {
                let validation: boolean = false;
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
                    resolve(<UserProfile>filteredUserProfile);
                } else {
                    reject({
                        status: validation
                    });
                }
            });

        return promise;
    }

    validate(userId: number, password: string): Promise<boolean> {
        let promise = new Promise<boolean>(
            async (resolve, reject) => {
                let filteredUserProfile = await this.getUserProfile(userId);
                let validationStatus = filteredUserProfile &&
                    filteredUserProfile.password === password;

                if (!validationStatus) {
                    reject(validationStatus);
                } else {
                    resolve(validationStatus);
                }
            });

        return promise;
    }
}

export default UserProfileService;
