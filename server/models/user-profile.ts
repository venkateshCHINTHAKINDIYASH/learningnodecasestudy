import ObjectFormatter from '../utilities/object-formatter';

class UserProfile {
    constructor(public userId: number, public password: string,
        public email: string, public department: string,
        public title: string) { }

    toString(): string {
        return ObjectFormatter.format(this);
    }
}

export default UserProfile;
