import NewsReducer from './news-reducer';
import * as actions from './news-actions';

const state = {
  empty: {
    error: false,
    isLoaded: false,
    isLoading: false,
    list: [],
  },
  error: {
    error: true,
    isLoaded: false,
    isLoading: false,
    list: [],
  },
  get: {
    error: false,
    isLoaded: false,
    isLoading: true,
    list: [],
  },
  success: {
    error: false,
    isLoaded: true,
    isLoading: false,
    list: ['a', 'b'],
  },
};
const testResponse = ['a', 'b'];

describe('News reducer', () => {
  it('Should return the initial state', () => {
    expect(NewsReducer(undefined, {})).toEqual(state.empty);
  });

  it('Should handle GET_NEWS', () => {
    expect(NewsReducer(undefined, {
      type: actions.GET_NEWS,
    })).toEqual(state.get);
  });

  it('Should handle FILL_NEWS', () => {
    expect(NewsReducer(undefined, {
      list: testResponse,
      type: actions.FILL_NEWS,
    })).toEqual(state.success);
  });

  it('Should handle NEWS_ERROR', () => {
    expect(NewsReducer(undefined, {
      type: actions.NEWS_ERROR,
    })).toEqual(state.error);
  });

  it('should handle missing action', () => {
    expect(NewsReducer(undefined, {
      data: testResponse,
      type: null,
    })).toEqual(state.empty);
  });
});
