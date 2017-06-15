import UserProfile from '../models/user-profile';

interface IUserProfileService {
    getUserProfile(userId: number): Promise<UserProfile>;
    validate(userId: number, password: string): Promise<boolean>;
}

export default IUserProfileService;
