import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { List, Pagination, Spin } from 'antd';
import { connect } from 'react-redux';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';

import NewsListItem from './news-list-item';
import NewsPageSelector from '../../state/selectors/news-page-selector';
import NewsSelector from '../../state/selectors/news-selector';

import './news-list.css';

export const NewsListItemRender = item => (<NewsListItem item={item} />);

export const NewsListComponent = ({
  changePage,
  news,
  newsPage,
  pageLength,
}) => {
  let newsListElement = null;
  if (news.error) {
    newsListElement = (
      <div className="News-list-message">
        <FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;
        There was an error retrieving the news
      </div>
    );
  } else if (news.isLoading) {
    newsListElement = (
      <div className="News-list-message">
        <Spin
          size="large"
        />
      </div>
    );
  } else if (news.isLoaded) {
    newsListElement = (
      <div>
        <div className="News-list-title">
          NEWS
        </div>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={newsPage.page}
          renderItem={NewsListItemRender}
        />
        <Pagination
          className="News-list-pagination"
          current={newsPage.pageIndex}
          hideOnSinglePage
          onChange={(page) => { changePage(page); }}
          pageSize={pageLength}
          total={news.list.length}
        />
      </div>
    );
  }
  return (
    <div className="News-list-container">
      { newsListElement }
    </div>
  );
};

NewsListComponent.propTypes = {
  changePage: PropTypes.func.isRequired,
  news: PropTypes.shape({
    error: PropTypes.bool,
    isLoaded: PropTypes.bool,
    isLoading: PropTypes.bool,
    list: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  }).isRequired,
  newsPage: PropTypes.shape({
    page: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        date: PropTypes.string,
        details: PropTypes.string,
        headline: PropTypes.string,
      }),
    ),
    pageIndex: PropTypes.number,
  }).isRequired,
  pageLength: PropTypes.number.isRequired,
};

/* istanbul ignore next */

const mapStateToProps = state => ({
  news: NewsSelector(state),
  newsPage: NewsPageSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(NewsListComponent);

export default ConnectedContainer;
