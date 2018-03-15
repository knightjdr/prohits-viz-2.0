import NewsListReducer from './news-page-reducer';
import * as actions from './news-page-actions';

const state = {
  empty: {
    page: [],
    pageIndex: 1,
  },
  set: {
    page: ['a'],
    pageIndex: 2,
  },
};

describe('News list set reducer', () => {
  it('Should return the initial state', () => {
    expect(NewsListReducer(undefined, {})).toEqual(state.empty);
  });

  it('Should handle SET_NEWS_PAGE', () => {
    expect(NewsListReducer(undefined, {
      page: ['a'],
      pageIndex: 2,
      type: actions.SET_NEWS_PAGE,
    })).toEqual(state.set);
  });
});
