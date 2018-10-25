import createSocketIoMiddleware from 'redux-socket.io';
import SocketIo from 'socket.io-client';
import React from 'react';
import Thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import Reducers from './reducers';
import reHydrate from './local-storage/rehydrate';
import Router from '../router/router';
import subscribeMiddleware from './local-storage/subscribe-middleware';
// import TestState from './test-state/test-state';

const socket = SocketIo(process.env.REACT_APP_API_HOST);

export const addDevTools = () => (
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__()
    :
    f => f
);

export const store = createStore(
  Reducers,
  reHydrate(),
  compose(
    applyMiddleware(
      Thunk,
      subscribeMiddleware,
      createSocketIoMiddleware(socket, ['post/']),
    ),
    addDevTools(),
  ),
);

const Store = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);
export default Store;
