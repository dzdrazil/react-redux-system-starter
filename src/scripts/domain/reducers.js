import {combineReducers} from 'redux-loop';
import {routeReducer} from 'react-router-redux';

import auth from './auth/AuthReducer';
import pets from './pets/PetsReducer';

export default combineReducers({
    auth,
    pets,
    routing: routeReducer
});
