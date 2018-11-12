import PropTypes from 'prop-types';
import React from 'react';
import { List, Pagination } from 'antd';
import { connect } from 'react-redux';

import Loading from '../../components/loading/loading';
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
      <Loading
        error
        message="There was an error retrieving the news"
      />
    );
  } else if (news.isLoading) {
    newsListElement = (
      <Loading />
    );
  } else if (news.isLoaded) {
    newsListElement = (
      <div>
        <div className="news__list-title">
          news
        </div>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={newsPage.page}
          renderItem={NewsListItemRender}
        />
        <Pagination
          className="news__list-pagination"
          current={newsPage.pageIndex}
          hideOnSinglePage
          onChange={changePage}
          pageSize={pageLength}
          total={news.list.length}
        />
      </div>
    );
  }
  return (
    <div className="news__list">
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
