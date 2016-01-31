import UserRepository from '../user/UserRepository';

import {
    loginSuccess,
    loginFailed
} from './AuthActions';

export const login = credentials => UserRepository
    .login(credentials)
    .then(u => loginSuccess(u))
    .catch(e => loginFailed(e));
