import { AnimatedSwitch } from 'react-router-transition';
import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import Analysis from '../analysis/analysis';
import App from '../App';
import Help from '../help/help';
import Missing from '../404/404';
import News from '../news/news';
import Visualization from '../visualization/visualization';

import './router.css';

const CaptureRouteNotFound = withRouter(({ children, location }) => (
  location && location.state && location.state.notFoundError ? <Missing /> : children
));

const Routes = () => (
  <Router>
    <CaptureRouteNotFound>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
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
      </AnimatedSwitch>
    </CaptureRouteNotFound>
  </Router>
);

export default Routes;
