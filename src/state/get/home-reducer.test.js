import HomeReducer from './home-reducer';
import * as actions from './home-actions';

const emptyState = {
  news: [],
  spotlight: [],
};
const testResponse = {
  news: ['a', 'b'],
  spotlight: ['a', 'b'],
};

describe('home reducer', () => {
  it('should return the initial state', () => {
    expect(HomeReducer(undefined, {})).toEqual(emptyState);
  });

  it('should handle FILL_HOME', () => {
    expect(HomeReducer(undefined, {
      data: testResponse,
      type: actions.FILL_HOME,
    })).toEqual(testResponse);
  });

  it('should handle missing action', () => {
    expect(HomeReducer(undefined, {
      data: testResponse,
      type: null,
    })).toEqual(emptyState);
  });
});
