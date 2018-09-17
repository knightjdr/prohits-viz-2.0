import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CaptureRouteNotFound from './capture-not-found';

// routes
import Analysis from '../analysis/analysis';
import App from '../App';
import Help from '../help/help';
import Missing from '../404/404';
import News from '../news/news';
import Visualization from '../visualization/visualization';

const Routes = () => (
  <Router>
    <CaptureRouteNotFound>
      <Switch>
        <Route
          exact
          path="/"
          component={App}
        />
        <Route
          path="/analysis"
          component={Analysis}
        />
        <Route
          path="/help"
          component={Help}
        />
        <Route
          path="/news"
          component={News}
        />
        <Route
          path="/visualization"
          component={Visualization}
        />
        <Route
          path="*"
          component={Missing}
        />
      </Switch>
    </CaptureRouteNotFound>
  </Router>
);
export default Routes;
