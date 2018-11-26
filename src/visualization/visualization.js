import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import DisplayImage from './__display/image/image-container';
import DisplayTask from './__display/visualization__display-task';
import RouteNotFound from '../router/route-not-found';
import SelectType from './__select/visualization__select-container';

export const VisualizationComponent = ({
  match,
}) => (
  <div>
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
