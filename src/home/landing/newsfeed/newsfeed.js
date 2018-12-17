import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import NewsfeedSelector from '../../../state/selectors/newsfeed-selector';

import './newsfeed.css';

export const NewsfeedComponent = ({
  news,
}) => {
  const newsElement = (
    <div className="newsfeed">
      <div className="newsfeed__header">
        News
      </div>
      <div className="newsfeed__inner">
        {
          news.map((item, index) => ([
            <time
              className="newsfeed__inner-date"
              key="date"
              style={{
                gridRow: index + 1,
              }}
            >
              { item.date }
            </time>,
            <div
              className="newsfeed__inner-news"
              key="news"
              style={{
                gridRow: index + 1,
              }}
            >
              <NavLink
                className="newsfeed__link"
                to={`/news/${item.headline}`}
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
