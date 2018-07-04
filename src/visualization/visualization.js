import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Display from './__display/visualization__display-container';
import Navbar from '../navbar/navbar-container';
import RouteNotFound from '../router/route-not-found';
import SelectType from './__select/visualization__select-container';

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
          component={SelectType}
        />
        <Route
          exact
          path={`${match.path}/:vizId`}
          component={Display}
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
