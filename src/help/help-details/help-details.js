import PropTypes from 'prop-types';
import React from 'react';
import { Breadcrumb } from 'antd';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import RouteNotFound from '../../router/route-not-found';

import HelpNavButtons from './help-nav-buttons-container';
import HelpPages from '../help-pages/help-pages';
import HelpRoutesMap from '../help-routes/help-routes-map';
import RoutesFromPath from '../../helpers/routes-from-path';

import './help-details.css';

export const toRouteNodes = (routes = HelpPages) => {
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
    <div className="help__details">
      <div className="help__details-inner">
        <Breadcrumb separator=">">
          { breadcrumbElement }
        </Breadcrumb>
        <div className="help__details-pages">
          <Switch>
            { contentElement }
            <RouteNotFound />
          </Switch>
          <HelpNavButtons />
        </div>
      </div>
    </div>
  );
};

HelpDetailsComponent.propTypes = {
  location: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default withRouter(HelpDetailsComponent);
