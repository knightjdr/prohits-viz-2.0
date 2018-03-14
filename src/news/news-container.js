import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';

import Navbar from '../navbar/navbar-container';
import NewsList from './news-list-container';
import NewsItem from './news-item-container';

import './news.css';

const links = [
  {
    route: '/news',
    text: 'NEWS',
  },
];

const NewsContainer = ({
  match,
}) => (
  <div>
    <Navbar links={links} />
    <div className="News-container">
      <Route
        exact
        path={match.path}
        component={NewsList}
      />
      <Route
        path={`${match.path}/:newsId`}
        component={NewsItem}
      />
    </div>
  </div>
);

NewsContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default NewsContainer;
