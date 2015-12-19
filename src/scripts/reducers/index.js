import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';

import auth from './authReducer';

export default combineReducers({
    auth,
    routing: routeReducer
});
