import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Navbar from '../navbar/navbar-container';
import NewsList from './news-list/news-list-container';
import NewsItem from './news-item/news-item-container';
import RouteNotFound from '../router/route-not-found';

import './news.css';

const links = [
  {
    route: '/analysis',
    text: 'analysis',
  },
  {
    route: '/visualization',
    text: 'visualization',
  },
  {
    route: '/help',
    text: 'help',
  },
];

export const NewsComponent = ({
  match,
}) => (
  <div>
    <Navbar links={links} />
    <div className="news">
      <Switch>
        <Route
          exact
          path={match.path}
          component={NewsList}
        />
        <Route
          exact
          path={`${match.path}/:newsId`}
          component={NewsItem}
        />
        <RouteNotFound />
      </Switch>
    </div>
  </div>
);

NewsComponent.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default withRouter(NewsComponent);
