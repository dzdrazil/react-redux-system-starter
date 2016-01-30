import {combineReducers} from 'redux';
import {routeReducer} from 'react-router-redux';

import auth from './authReducer';
import pets from './petsReducer';

export default combineReducers({
    auth,
    pets,
    routing: routeReducer
});
