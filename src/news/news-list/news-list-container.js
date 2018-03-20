import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FetchNews from '../../state/get/news-actions';
import NewsList from './news-list';
import NewsSelector from '../../state/selectors/news-selector';
import { setNewsPage } from '../../state/set/news-page-actions';

const pageLength = 5;

export class NewsListContainer extends Component {
  componentDidMount = () => {
    this.props.fetchNews();
  }
  componentWillReceiveProps = (nextProps) => {
    const { news } = nextProps;
    this.setFirstPage(news, this.props.news);
  }
  setFirstPage = (currNews, oldNews) => {
    if (
      currNews.list.length > 0 &&
      oldNews.list.length === 0
    ) {
      this.changePage(1, currNews.list);
    }
  }
  changePage = (page, news = this.props.news.list) => {
    const arrStart = (page - 1) * pageLength;
    this.props.setNewsPage(
      news.slice(arrStart, arrStart + pageLength),
      page,
    );
  }
  render() {
    return (
      <NewsList
        changePage={this.changePage}
        pageLength={pageLength}
      />
    );
  }
}

NewsListContainer.propTypes = {
  fetchNews: PropTypes.func.isRequired,
  news: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        date: PropTypes.string,
        details: PropTypes.string,
        headline: PropTypes.string,
      }),
    ),
  }).isRequired,
  setNewsPage: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchNews: () => {
    dispatch(FetchNews());
  },
  setNewsPage: (page, pageIndex) => {
    dispatch(setNewsPage(page, pageIndex));
  },
});

/* istanbul ignore next */
const mapStateToProps = state => ({
  news: NewsSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsListContainer);

export default ConnectedContainer;
