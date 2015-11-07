import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import App from './AppContainer';
import reducers from './reducers/index';

let store = createStore(reducers);

let rootElement = document.getElementById('js-root-container');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
