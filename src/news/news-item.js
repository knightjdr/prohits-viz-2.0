import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationTriangle from '@fortawesome/fontawesome-pro-solid/faExclamationTriangle';
import faNewspaper from '@fortawesome/fontawesome-pro-regular/faNewspaper';
import PropTypes from 'prop-types';
import React from 'react';
import { Affix, Spin, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import NewsItemSelector from '../state/selectors/news-item-selector';
import TextToHtml from '../helpers/text-to-html';

import './news-item.css';

export const NewsItemComponent = ({
  newsItem,
}) => {
  const newsItemElement = newsItem ?
    (
      <div className="News-item-container">
        {
          newsItem.isLoading &&
          <Spin
            size="large"
          />
        }
        {
          newsItem.error &&
          <div>
            <FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;
            There was an error retrieving this story
          </div>
        }
        {
          newsItem.isLoaded &&
          <div className="News-item-content">
            <div className="News-item-navbutton-container">
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
            <div className="News-item-story">
              <div className="News-item-headline">
                { newsItem.item.headline }
              </div>
              <div className="News-item-date">
                { newsItem.item.date }
              </div>
              <div className="News-item-details">
                { TextToHtml(newsItem.item.details) }
              </div>
            </div>
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
    error: PropTypes.bool,
    isLoaded: PropTypes.bool,
    isLoading: PropTypes.bool,
    item: PropTypes.shape({
      date: PropTypes.string,
      details: PropTypes.string,
      headline: PropTypes.string,
    }),
  }),
};

const mapStateToProps = state => ({
  newsItem: NewsItemSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(NewsItemComponent);

export default ConnectedContainer;
