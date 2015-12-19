import t from 'tcomb';
import {pushPath} from 'redux-simple-router';

import {User} from '../../domain/types/User';
import UserService from '../../domain/services/UserService';

// ACTION NAMES
export const LOGIN_STARTED = 'login-started';
export const LOGIN_SUCCESS = 'login-success';
export const LOGIN_FAILED = 'login-failed';

// ACTION MESSAGES

/**
 * @class LoginSuccessMessage
 */
let LoginSuccessMessage = t.struct({
    /**
     * @property username
     * @type {String}
     */
    username: t.String
});

/**
 * @class LoginFailureMessage
 */
let LoginFailureMessage = t.struct({
    /**
     * @property
     * @type {Error}
     */
    error: t.Error
});

// PRIVATE ACTIONS
let loginStart = () => ({type: LOGIN_STARTED});

let loginSuccess = ({username}) => ({
    type: LOGIN_SUCCESS,
    payload: new User({username})
});

let loginFailed = e => ({
    payload: e,
    type: LOGIN_FAILED
});

// PUBLIC ACTIONS

/**
 * Login action
 *
 * Triggers LOGIN_STARTED
 * then calls UserService.login
 * then
 * on success -> triggers LOGIN_SUCCESS
 * on error -> triggers LOGIN_FAILED
 *
 * @param  {UserCredentials} credentials user login credentials
 * @returns {Promise<>}
 */
export let login = (credentials) => {
    return (dispatch) => {
        dispatch(loginStart());

        return UserService
            .login(credentials)
            .then(() => dispatch(loginSuccess(new LoginSuccessMessage(credentials))))
            .then(() => dispatch(pushPath('/home')))
            .catch(e => dispatch(loginFailed(new LoginFailureMessage({error: e}))));
    };
};

