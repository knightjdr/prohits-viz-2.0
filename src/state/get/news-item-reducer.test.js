import NewsItemReducer from './news-item-reducer';
import * as actions from './news-item-actions';

const emptyState = {
  error: false,
  id: null,
  isLoaded: false,
  isLoading: false,
  item: null,
};
const testResponse = 'a';

describe('News item reducer', () => {
  it('should return the initial state', () => {
    const action = {};
    const expectedState = emptyState;
    expect(NewsItemReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle GET_NEWS_ITEM action', () => {
    const action = {
      id: 'id',
      type: actions.GET_NEWS_ITEM,
    };
    const expectedState = {
      error: false,
      id: 'id',
      isLoaded: false,
      isLoading: true,
      item: null,
    };
    expect(NewsItemReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FILL_NEWS_ITEM action', () => {
    const action = {
      id: 'id',
      item: testResponse,
      type: actions.FILL_NEWS_ITEM,
    };
    const expectedState = {
      error: false,
      id: 'id',
      isLoaded: true,
      isLoading: false,
      item: 'a',
    };
    expect(NewsItemReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle NEWS_ITEM_ERROR action', () => {
    const action = {
      id: 'id',
      type: actions.NEWS_ITEM_ERROR,
    };
    const expectedState = {
      error: true,
      id: 'id',
      isLoaded: false,
      isLoading: false,
      item: null,
    };
    expect(NewsItemReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle missing action', () => {
    const action = {
      data: testResponse,
      type: null,
    };
    const expectedState = emptyState;
    expect(NewsItemReducer(undefined, action)).toEqual(expectedState);
  });
});
