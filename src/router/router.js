import { AnimatedSwitch } from 'react-router-transition';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Analysis from '../analysis/analysis';
import App from '../App';
import Help from '../help/help';
import Missing from '../404/404';
import Visualization from '../visualization/visualization';

import './router.css';

const Routes = () => (
  <Router>
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
        path="/visualization"
        component={Visualization}
      />
      <Route
        path="*"
        component={Missing}
      />
    </AnimatedSwitch>
  </Router>
);

export default Routes;
