import PropTypes from 'prop-types';
import React from 'react';
import { Breadcrumb } from 'antd';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import RouteNotFound from '../../router/route-not-found';

import HelpNavButtons from './help-nav-buttons-container';
import HelpRoutes from '../help-routes/help-routes';
import HelpRoutesMap from '../help-routes/help-routes-map';
import RoutesFromPath from '../../helpers/routes-from-path';

import './help-details.css';

export const toRouteNodes = (routes = HelpRoutes) => {
  let routeArr = [];
  routes.forEach((route) => {
    routeArr.push(
      <Route
        exact
        key={route.route}
        path={route.route}
        component={route.component}
      />,
    );
    if (route.children) {
      routeArr = routeArr.concat(toRouteNodes(route.children));
    }
  });
  return routeArr;
};

export const HelpDetailsComponent = ({
  location,
}) => {
  const breadcrumbElement = RoutesFromPath(location.pathname).map(path => (
    <Breadcrumb.Item
      key={path}
    >
      <NavLink
        to={path}
      >
        { HelpRoutesMap.routeToText[path] }
      </NavLink>
    </Breadcrumb.Item>
  ));
  const contentElement = toRouteNodes();
  return (
    <div className="HelpDetails-container">
      <Breadcrumb separator=">">
        { breadcrumbElement }
      </Breadcrumb>
      <div className="HelpDetails-pages">
        <Switch>
          { contentElement }
          <RouteNotFound />
        </Switch>
      </div>
      <HelpNavButtons />
    </div>
  );
};

HelpDetailsComponent.propTypes = {
  location: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default withRouter(HelpDetailsComponent);
