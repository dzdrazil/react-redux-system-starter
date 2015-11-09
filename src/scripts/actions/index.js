import {bindActionCreators} from 'redux';

import {login} from './login/index';

export let createBoundActions = dispatch => bindActionCreators({
    login
}, dispatch);
