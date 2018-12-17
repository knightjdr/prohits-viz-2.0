import React from 'react';

import ErrorBoundary from './error/error-boundary-container';
import Store from './state/store';

import './app.css';

const App = () => (
  <ErrorBoundary>
    <Store />
  </ErrorBoundary>
);

export default App;
