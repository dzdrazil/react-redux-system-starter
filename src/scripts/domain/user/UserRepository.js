import { User } from './UserTypes';

class UserRepository {
    login(credentials) {
        return new Promise(resolve => setTimeout(() => resolve(new User({username: credentials.username})), 1000));
    }
}

export default new UserRepository();
