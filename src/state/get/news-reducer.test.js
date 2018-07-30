import NewsReducer from './news-reducer';
import * as actions from './news-actions';

const emptyState = {
  error: false,
  isLoaded: false,
  isLoading: false,
  list: [],
};

describe('News reducer', () => {
  it('should return the initial state', () => {
    const action = {};
    const expectedState = emptyState;
    expect(NewsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle GET_NEWS action', () => {
    const action = {
      type: actions.GET_NEWS,
    };
    const expectedState = {
      error: false,
      isLoaded: false,
      isLoading: true,
      list: [],
    };
    expect(NewsReducer(undefined, action)).toEqual(expectedState);
  });

  it('Should handle FILL_NEWS', () => {
    const action = {
      list: ['a', 'b'],
      type: actions.FILL_NEWS,
    };
    const expectedState = {
      error: false,
      isLoaded: true,
      isLoading: false,
      list: ['a', 'b'],
    };
    expect(NewsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle NEWS_ERROR action', () => {
    const action = {
      type: actions.NEWS_ERROR,
    };
    const expectedState = {
      error: true,
      isLoaded: false,
      isLoading: false,
      list: [],
    };
    expect(NewsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle missing action', () => {
    const action = {
      data: ['a', 'b'],
      type: null,
    };
    const expectedState = emptyState;
    expect(NewsReducer(undefined, action)).toEqual(expectedState);
  });
});
