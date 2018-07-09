import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import NewsfeedSelector from '../../state/selectors/newsfeed-selector';

import './newsfeed.css';

export const NewsfeedComponent = ({
  news,
}) => {
  const newsElement = (
    <div className="Newsfeed-container">
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
    news.length > 0 ? newsElement : null
  );
};

NewsfeedComponent.defaultProps = {
  news: [],
};

NewsfeedComponent.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      date: PropTypes.string,
      headline: PropTypes.string,
    }),
  ),
};

/* istanbul ignore next */

const mapStateToProps = state => ({
  news: NewsfeedSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(NewsfeedComponent);

export default ConnectedContainer;
