import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationTriangle from '@fortawesome/fontawesome-pro-solid/faExclamationTriangle';
import faNewspaper from '@fortawesome/fontawesome-pro-regular/faNewspaper';
import PropTypes from 'prop-types';
import React from 'react';
import { Affix, Spin, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import NewsItemSelector from '../state/selectors/news-item-selector';

import './news-item.css';

export const NewsItemComponent = ({
  newsItem,
}) => {
  const newsItemElement = newsItem ?
    (
      <div className="New-item-container">
        {
          newsItem.isLoading &&
          <Spin
            className="News-item-child"
            size="large"
          />
        }
        {
          newsItem.error &&
          <div className="News-item-child">
            <FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;
            There was an error retrieving this story
          </div>
        }
        {
          newsItem.isLoaded &&
          <div className="News-item-child News-item-story">
            <div className="News-item-headline">
              { newsItem.item.headline }
            </div>
            <div className="News-item-date">
              { newsItem.item.date }
            </div>
            <div className="News-item-details">
              { newsItem.item.details }
            </div>
            <Affix
              className="News-item-navbuttons"
              offsetTop={20}
            >
              <Tooltip
                placement="right"
                title="News archive"
              >
                <NavLink
                  className="News-item-navlink"
                  to="/news"
                >
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    size="lg"
                  />
                </NavLink>
              </Tooltip>
            </Affix>
          </div>
        }
      </div>
    )
    :
    null;
  return newsItemElement;
};

NewsItemComponent.defaultProps = {
  newsItem: null,
};

NewsItemComponent.propTypes = {
  newsItem: PropTypes.shape({
    _id: PropTypes.string,
    date: PropTypes.string,
    details: PropTypes.string,
    headline: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  newsItem: NewsItemSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(NewsItemComponent);

export default ConnectedContainer;
