
/**
 * ACTION NAMES
 *
 * These constants are shared between actions, and the reducers that respond to them
 * be sure to export these
 */
export const LOGIN_STARTED = 'login-started';

export const loginStart = credentials => ({type: LOGIN_STARTED, payload: credentials});


export const LOGIN_SUCCESS = 'login-success';

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
});


export const LOGIN_FAILED = 'login-failed';

export const loginFailed = e => ({
    payload: e,
    type: LOGIN_FAILED
});

