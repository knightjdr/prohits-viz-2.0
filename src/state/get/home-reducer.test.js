import HomeReducer from './home-reducer';
import * as actions from './home-actions';

const emptyState = {
  isLoaded: false,
  news: [],
  spotlight: [],
};
const stateWithData = {
  isLoaded: true,
  news: ['a', 'b'],
  spotlight: ['a', 'b'],
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
    })).toEqual(stateWithData);
  });

  it('should handle missing action', () => {
    expect(HomeReducer(undefined, {
      data: testResponse,
      type: null,
    })).toEqual(emptyState);
  });
});
