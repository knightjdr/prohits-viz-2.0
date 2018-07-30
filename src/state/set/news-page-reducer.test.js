import NewsListReducer from './news-page-reducer';
import * as actions from './news-page-actions';

describe('News list set reducer', () => {
  it('should return the initial state', () => {
    const action = {};
    const expectedState = {
      page: [],
      pageIndex: 1,
    };
    expect(NewsListReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_NEWS_PAGE action', () => {
    const action = {
      page: ['a'],
      pageIndex: 2,
      type: actions.SET_NEWS_PAGE,
    }
    const expectedState = {
      page: ['a'],
      pageIndex: 2,
    }
    expect(NewsListReducer(undefined, action)).toEqual(expectedState);
  });
});
