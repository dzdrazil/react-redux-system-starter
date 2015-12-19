import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute} from 'react-router';
// Don't want hash routing? (i.e. with # in the url)?
// simply import {createHistory} from 'history'
import createHistory from 'history/lib/createHashHistory';
import {syncReduxAndRouter} from 'redux-simple-router';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

import App from './AppContainer';
import Login from './components/containers/Login';
import Home from './components/containers/Home';


let createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);
let store = createStoreWithMiddleware(reducers);
let history = createHistory({
    queryKey: false // not ideal, but it looks cleaner when HTML5 history isn't an option
});

syncReduxAndRouter(history, store);

let rootElement = document.getElementById('js-root-container');

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} >
                <IndexRoute component={Login} />
                <Route path="home" component={Home} />
            </Route>
        </Router>
    </Provider>,
    rootElement
);
