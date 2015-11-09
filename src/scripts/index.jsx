import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute} from 'react-router';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

import App from './AppContainer';
import Login from './components/layouts/Login';
import Home from './components/layouts/Home';


let createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);
let store = createStoreWithMiddleware(reducers);

let rootElement = document.getElementById('js-root-container');

render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} >
                <IndexRoute component={Login} />
                <Route path="home" component={Home} />
            </Route>
        </Router>
    </Provider>,
    rootElement
);
