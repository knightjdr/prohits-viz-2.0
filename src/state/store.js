import React from 'react';
import Thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Reducers from './reducers';
import Router from '../router/router';

export const addDevTools = () => (
  (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* eslint-disable no-underscore-dangle */
export const store = createStore(
  Reducers,
  addDevTools(),
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