import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import {syncHistory} from 'react-router-redux';
import thunk from 'redux-thunk';
import { install as reduxLoop } from 'redux-loop';

import reducers from './domain/reducers';

import App from './AppContainer';
import Login from './components/containers/Login';
import Home from './components/containers/Home';

import {fetchPets} from './domain/pets/PetActions';

// setup history
const reduxRouterMiddleware = syncHistory(hashHistory);

// setup store (combination of middleware and reducers)
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRouterMiddleware
)((window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore));
const store = reduxLoop()(createStoreWithMiddleware)(reducers);

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
