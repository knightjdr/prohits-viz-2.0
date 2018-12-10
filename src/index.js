import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './error/error-boundary-container';
import Store from './state/store';
import { unregister } from './registerServiceWorker';

import './index.css';

ReactDOM.render(
  <ErrorBoundary>
    <Store />
  </ErrorBoundary>,
  document.getElementById('root'),
);
unregister();
