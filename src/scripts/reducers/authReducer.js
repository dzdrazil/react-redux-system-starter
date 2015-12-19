import t from 'tcomb';
import {createReducer} from 'redux-create-reducer';

// import action constants to establish
// how new states should be derived
import {
    LOGIN_STARTED,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../actions/login/index';

// type imported for type checking, naturally
import {User} from '../domain/types/User';


// define the type parameters for the state
/**
 * @class AuthenticationState
 */
const AuthenticationState = t.struct({
    /**
     * @property
     * @type {Boolean}
     */
    isLoading: t.Boolean,
    /**
     * @property
     * @type {Null|User}
     */
    user: t.maybe(User), // user may or may not exist
    /**
     * @property
     * @param {Null|Error}
     */
    error: t.maybe(t.Error) // loading the user may or may not have errored
}, 'AuthenticationState');

// these states are effectively constant types-
// the application may switch between them, but their values aren't
// in any way dependent upon the action's payload
const INITIAL_STATE = new AuthenticationState({
    isLoading: false,
    user: null,
    error: null
});

const LOADING_STATE = new AuthenticationState({
    isLoading: true,
    user: null,
    error: null
});

export default createReducer(INITIAL_STATE, {
    [LOGIN_STARTED]() {
        return LOADING_STATE;
    },

    [LOGIN_FAILED](state, action) {
        return new AuthenticationState({
            isLoading: false,
            error: action.payload,
            user: null
        });
    },

    [LOGIN_SUCCESS](state, action) {
        return Object.assign({}, INITIAL_STATE, {user: action.payload});
    }
});
