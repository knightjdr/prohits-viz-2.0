import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CaptureRouteNotFound from './capture-not-found';
import RouterLocations from './router-locations';

const Routes = () => (
  <Router basename={process.env.REACT_APP_BASE}>
    <CaptureRouteNotFound>
      <RouterLocations />
    </CaptureRouteNotFound>
  </Router>
);

export default Routes;
