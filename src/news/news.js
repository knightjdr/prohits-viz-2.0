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
    route: '/news',
    text: 'NEWS',
  },
];

export const News = ({
  location,
}) => (
  <div>
    <Navbar links={links} />
    <div className="News-container">
      <Switch>
        <Route
          exact
          path={location.pathname}
          component={NewsList}
        />
        <Route
          exact
          path={`${location.pathname}/:newsId`}
          component={NewsItem}
        />
        <RouteNotFound />
      </Switch>
    </div>
  </div>
);

News.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(News);
