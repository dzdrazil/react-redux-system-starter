/**
 * # Authentication actions
 *
 * Currently, this file is organized under the login foler.  That should probably
 * be changed to 'authentication', but for now it works.
 *
 * Action files may follow the following organizational convention:
 *
 *  - imports
 *  - exported action names
 *  - private action message types (used for typing payloads)
 *  - private actions (used in tandem with `thunk` actions)
 *  - public actions
 */

import t from 'tcomb'; // used for creating typed classes - in particular, action payloads
                       // note that actions must be vanilla objects per redux convention (to support hot-reload, etc)
import {pushPath} from 'redux-simple-router'; // used by actions that need to change the URL / integrate with routing

import {User} from '../../domain/types/User'; // User class
import UserService from '../../domain/services/UserService'; // UserService (for user-related APIs)

/**
 * ACTION NAMES
 *
 * These constants are shared between actions, and the reducers that respond to them
 * be sure to export these
 */
export const LOGIN_STARTED = 'login-started';
export const LOGIN_SUCCESS = 'login-success';
export const LOGIN_FAILED = 'login-failed';

/**
 * ACTION MESSAGES
 *
 * These are private classes, primarily used to ensure that components
 * who invoke actions pass valid arguments, as well as for converting API
 * responses into domain types
 */
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

/**
 * PRIVATE ACTIONS
 *
 * Generally, user-initiated actions should be exported (publicly exposed).
 * However, user interactions that require some sort of asynchronous behavior (such as an API call)
 * can actually be best represented by several actions- so that each step of the process is encapsulated
 * by a reducer.
 *
 * In that case, those individual steps should be private (i.e. not exported) actions, which can then
 * be combined together by a single, public action (see below).
 *
 * In this example, the following three actions represent the three possible behaviors triggered by
 * a user attempting to log in:
 *
 * - login started (indicates that an asychronous process is beginning)
 * - login succeeded (indicates that the asynchronous process is complete, and the result can be stored)
 * - login failed (indicates that the process errored out, and the error can be stored for assisting the user)
 *
 * This is a fairly common pattern, and there is some room here to abstract away what will likely be a likely
 * copy-paste candidate set of code. It's left here, in all of its glory, for demonstration purposes.
 */
let loginStart = () => ({type: LOGIN_STARTED});

let loginSuccess = ({username}) => ({
    type: LOGIN_SUCCESS,
    payload: new User({username}) // notice that all the effort of destructuring the LoginSuccessMessage into a username,
                                  // and passing that back through into a User message isn't strictly necessary here.
                                  // However, it's a simple proof that API responses can be transformed into domain models
                                  // - for example, not all of the properties of the API response may be needed, or some sort of
                                  //   transformation could take place (for instance, converting a date string into a real date object)
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

