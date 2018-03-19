import React from 'react';
import { Breadcrumb } from 'antd';
import { Route, Switch } from 'react-router-dom';
import RouteNotFound from '../../router/route-not-found';

import HelpRoutes from '../help-routes';

import './help-details.css';

export const toRouteNodes = (routes, routeArr = [], ret = true) => {
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
      toRouteNodes(route.children, routeArr, false);
    }
  });
  return ret ? routeArr : null;
};

const HelpDetails = () => (
  <div className="HelpDetails-container">
    <Breadcrumb separator=">">
      <Breadcrumb.Item>Help</Breadcrumb.Item>
      <Breadcrumb.Item>Other</Breadcrumb.Item>
    </Breadcrumb>
    <div>
      <Switch>
        { toRouteNodes(HelpRoutes) }
        <RouteNotFound />
      </Switch>
    </div>
  </div>
);

export default HelpDetails;
