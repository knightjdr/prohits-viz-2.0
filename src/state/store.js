import React from 'react';
import Thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Reducers from './reducers';
import Router from '../router/router';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  Reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    Thunk,
  ),
);
/* eslint-enable */

const Store = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default Store;
