import {createReducer} from 'redux-create-reducer';

import {
    LOGIN_STARTED,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../actions/login/index';

const INITIAL_STATE = {
    isLoggedIn: false,
    isLoading: false,
    user: null,
    error: null
};

const LOADING_STATE = Object.assign({}, INITIAL_STATE, {isLoading: true});

export default createReducer(INITIAL_STATE, {
    [LOGIN_STARTED]() {
        return LOADING_STATE;
    },

    [LOGIN_FAILED](state, action) {
        return Object.assign({}, INITIAL_STATE, {error: action.payload});
    },

    [LOGIN_SUCCESS](state, action) {
        return Object.assign({}, INITIAL_STATE, {user: action.payload});
    }
});
