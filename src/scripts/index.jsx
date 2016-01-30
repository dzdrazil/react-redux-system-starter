import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import {syncHistory} from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

import App from './AppContainer';
import Login from './components/containers/Login';
import Home from './components/containers/Home';

import {fetchPets} from './actions/pets/index';

// setup history
const reduxRouterMiddleware = syncHistory(hashHistory);

// setup store (combination of middleware and reducers)
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRouterMiddleware
)(createStore);
const store = createStoreWithMiddleware(reducers);

// mount and render the application
const rootElement = document.getElementById('js-root-container');

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App} >
                <IndexRoute component={Login} />
                <Route path="home" component={Home} onEnter={() => store.dispatch(fetchPets())}/>
            </Route>
        </Router>
    </Provider>,
    rootElement
);
