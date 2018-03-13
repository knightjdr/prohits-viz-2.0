import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './newsfeed.css';

const Newsfeed = ({
  news,
}) => {
  const newsElement = () => (
    <div className="Newsfeed-container boxshadow fadein">
      <div className="Newsfeed-header">
        News
      </div>
      <div className="Newsfeed-content">
        {
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
              <NavLink
                className="Newsfeed-link"
                to={`/news/${item._id}`}
              >
                { item.headline }
              </NavLink>
            </div>,
          ]))
        }
      </div>
    </div>
  );
  return (
    news.length > 0 ? newsElement(news) : null
  );
};

Newsfeed.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      news: PropTypes.string,
    }),
  ).isRequired,
};

export default Newsfeed;
