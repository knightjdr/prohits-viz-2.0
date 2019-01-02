import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';

// routes
import Analysis from '../analysis/analysis-loadable';
import Home from '../home/home';
import Help from '../help/help-loadable';
import Missing from '../404/404';
import Navbar from '../navbar/navbar-container';
import News from '../news/news';
import Tasks from '../tasks/tasks-container';
import Visualization from '../visualization/visualization-loadable';

// css to preload for loadable components
import '../analysis/form/analysis-form.css';
import '../analysis/form/file/file-input.css';
import '../help/help.css';
import '../help/help-bar/help-bar.css';
import '../help/help-details/help-details.css';
import '../visualization/__select/visualization__select.css';
import '../visualization/__display/image/image.css';

export const Locations = ({ location }) => (
  <Fragment>
    <Navbar
      background={location.pathname === '/' ? 'semi' : 'dark'}
      fixed={location.pathname.startsWith('/help')}
    />
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
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
  </Fragment>
);

Locations.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(Locations);
