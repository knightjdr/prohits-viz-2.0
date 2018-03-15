import { SET_NEWS_PAGE } from './news-page-actions';

const News = (state = {
  page: [],
  pageIndex: 1,
}, action) => {
  switch (action.type) {
    case SET_NEWS_PAGE:
      return {
        page: action.page,
        pageIndex: action.pageIndex,
      };
    default:
      return state;
  }
};
export default News;
