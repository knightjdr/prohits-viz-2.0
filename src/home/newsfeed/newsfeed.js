import PropTypes from 'prop-types';
import React from 'react';

import './newsfeed.css';

const Newsfeed = ({
  news,
}) => {
  const newsElement = () => (
    news.map((item, index) => ([
      <div
        className="Newsfeed-content-date"
        key="date"
        style={{
          gridRow: index + 1,
        }}
      >
        { item.date }
      </div>,
      <div
        className="Newsfeed-content-news"
        key="news"
        style={{
          gridRow: index + 1,
        }}
      >
        { item.news }
      </div>,
    ]))
  );
  return (
    <div className="Newsfeed-container boxshadow">
      <div className="Newsfeed-header">
        News
      </div>
      <div className="Newsfeed-content">
        { newsElement(news) }
      </div>
    </div>
  );
};

Newsfeed.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      new: PropTypes.string,
    }),
  ).isRequired,
};

export default Newsfeed;
