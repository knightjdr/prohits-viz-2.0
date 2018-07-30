import * as actions from './news-page-actions';

describe('News page set actions', () => {
  it('should dispatch an action to set the page', () => {
    const expectedAction = {
      page: ['a'],
      pageIndex: 2,
      type: actions.SET_NEWS_PAGE,
    };
    expect(actions.setNewsPage(['a'], 2)).toEqual(expectedAction);
  });
});
