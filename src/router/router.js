import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CaptureRouteNotFound from './capture-not-found';

// routes
import Analysis from '../analysis/analysis-loadable';
import App from '../App';
import Help from '../help/help-loadable';
import Missing from '../404/404';
import News from '../news/news';
import Tasks from '../tasks/tasks-container';
import Visualization from '../visualization/visualization-loadable';

const Routes = () => (
  <Router basename={process.env.REACT_APP_BASE}>
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
          path="/tasks"
          component={Tasks}
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
