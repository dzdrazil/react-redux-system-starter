export const LOGIN_STARTED = 'login-started';
export const LOGIN_SUCCESS = 'login-success';
export const LOGIN_FAILED = 'login-failed';

// PLACEHOLDER BEHAVIOR
let doLogin = () => {
    return new Promise(resolve => setTimeout(() => resolve(), 1000));
};

let loginStart = () => ({
    type: LOGIN_STARTED
});

let loginSuccess = ({username}) => ({
    type: LOGIN_SUCCESS,
    payload: {username}
});

let loginFailed = (e) => ({
    type: LOGIN_FAILED,
    payload: e
});

export let login = (credentials) => {
    return (dispatch) => {
        dispatch(loginStart());

        return doLogin()
            .then(() => dispatch(loginSuccess(credentials)))
            .catch(e => dispatch(loginFailed(e)));
    };
};

