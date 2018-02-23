import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './newsfeed.css';

class Newsfeed extends Component {
  newsElement = (news) => {
    return news.map((item, index) => {
      return [
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
        </div>
      ];
    });
  }
  render() {
    return (
      <div className="Newsfeed-container">
        <div className="Newsfeed-header">
          News
        </div>
        <div className="Newsfeed-content">
          { this.newsElement(this.props.news) }
        </div>
      </div>
    );
  }
}

Newsfeed.propTypes = {
  news: PropTypes.array.isRequired,
};

export default Newsfeed;
