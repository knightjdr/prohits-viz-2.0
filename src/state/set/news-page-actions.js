export const SET_NEWS_PAGE = 'SET_NEWS_PAGE';

export const setNewsPage = (page, pageIndex) => ({
  page,
  pageIndex,
  type: SET_NEWS_PAGE,
});
