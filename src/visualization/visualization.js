import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import DisplayViz from './display-viz/display-viz-container';
import Navbar from '../navbar/navbar-container';
import RouteNotFound from '../router/route-not-found';
import SelectVizType from './select-viz/select-viz-type-container';

const links = [
  {
    route: '/analysis',
    text: 'ANALYSIS',
  },
  {
    route: '/news',
    text: 'NEWS',
  },
  {
    route: '/help',
    text: 'HELP',
  },
];

export const VisualizationComponent = ({
  match,
}) => (
  <div>
    <Navbar
      links={links}
    />
    <div>
      <Switch>
        <Route
          exact
          path={match.path}
          component={SelectVizType}
        />
        <Route
          exact
          path={`${match.path}/:vizId`}
          component={DisplayViz}
        />
        <RouteNotFound />
      </Switch>
    </div>
  </div>
);

VisualizationComponent.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default withRouter(VisualizationComponent);
