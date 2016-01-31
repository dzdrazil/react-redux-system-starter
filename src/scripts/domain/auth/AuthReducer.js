import t from 'tcomb';
import {createReducer} from 'redux-create-reducer';


import {routeActions} from 'react-router-redux'; // used by actions that need to change the URL / integrate with routing
import { loop, Effects } from 'redux-loop';

import { login } from './AuthEffects';

// import action constants to establish
// how new states should be derived
import {
    LOGIN_STARTED,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from './AuthActions';

// type imported for type checking, naturally
import {User} from '../user/UserTypes';


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
    // The state is simple enough that in these action handlers, it's generally
    // easier (fewer lines, fewer mistakes) to simply create a whole new
    // state object than it is to invoke an update on the previous one
    //
    // note that this handler returns 'loop', meaning it not only returns
    // a new state, but also describes the only next logical sequence of
    // actions that are allowed by the result of this action
    [LOGIN_STARTED](state, action) {
        return loop(
            LOADING_STATE,
            Effects.promise(login, action.payload)
        );
    },

    [LOGIN_FAILED](state, action) {
        return new AuthenticationState({
            isLoading: false,
            error: action.payload,
            user: null
        });
    },

    [LOGIN_SUCCESS](state, action) {
        return loop(
            new AuthenticationState({
                isLoading: false,
                error: null,
                user: action.payload
            }),
            Effects.constant(routeActions.push('/home'))
        );
    }
});
