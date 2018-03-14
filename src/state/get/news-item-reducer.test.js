import NewsItemReducer from './news-item-reducer';
import * as actions from './news-item-actions';

const state = {
  empty: {
    error: false,
    id: null,
    isLoaded: false,
    isLoading: false,
    item: null,
  },
  error: {
    error: true,
    id: 'id',
    isLoaded: false,
    isLoading: false,
    item: null,
  },
  get: {
    error: false,
    id: 'id',
    isLoaded: false,
    isLoading: true,
    item: null,
  },
  success: {
    error: false,
    id: 'id',
    isLoaded: true,
    isLoading: false,
    item: 'a',
  },
};
const testResponse = 'a';

describe('News item reducer', () => {
  it('Should return the initial state', () => {
    expect(NewsItemReducer(undefined, {})).toEqual(state.empty);
  });

  it('Should handle GET_NEWS_ITEM', () => {
    expect(NewsItemReducer(undefined, {
      id: 'id',
      type: actions.GET_NEWS_ITEM,
    })).toEqual(state.get);
  });

  it('Should handle FILL_NEWS_ITEM', () => {
    expect(NewsItemReducer(undefined, {
      id: 'id',
      item: testResponse,
      type: actions.FILL_NEWS_ITEM,
    })).toEqual(state.success);
  });

  it('Should handle NEWS_ITEM_ERROR', () => {
    expect(NewsItemReducer(undefined, {
      id: 'id',
      type: actions.NEWS_ITEM_ERROR,
    })).toEqual(state.error);
  });

  it('should handle missing action', () => {
    expect(NewsItemReducer(undefined, {
      data: testResponse,
      type: null,
    })).toEqual(state.empty);
  });
});
