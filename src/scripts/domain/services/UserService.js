class UserService {
    login(/* credentials- type UserCredentials, eventually */) {
        return new Promise(resolve => setTimeout(() => resolve(), 1000));
    }
}

export default new UserService();
