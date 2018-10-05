import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import DisplayImage from './__display/image/image-container';
import DisplayTask from './__display/visualization__display-task';
import Navbar from '../navbar/navbar-container';
import RouteNotFound from '../router/route-not-found';
import SelectType from './__select/visualization__select-container';

const links = [
  {
    route: '/analysis',
    text: 'analysis',
  },
  {
    route: '/news',
    text: 'news',
  },
  {
    route: '/help',
    text: 'help',
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
          path={`${match.path}/:id`}
          component={DisplayTask}
        />
        <Route
          exact
          path={`${match.path}/:id/:image`}
          component={DisplayImage}
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
