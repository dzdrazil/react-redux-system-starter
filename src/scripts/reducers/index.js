import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';

import auth from './authReducer';
import pets from './petsReducer';

export default combineReducers({
    auth,
    pets,
    routing: routeReducer
});
