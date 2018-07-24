import React from 'react';
import Thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import Reducers from './reducers';
import Router from '../router/router';
import TestState from './test-state/test-state';

export const addDevTools = () => (
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__()
    :
    f => f
);

export const store = createStore(
  Reducers,
  TestState,
  compose(
    applyMiddleware(Thunk),
    addDevTools(),
  ),
);

const Store = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);
export default Store;
