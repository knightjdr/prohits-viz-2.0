import PositionReducer from './position-reducer';
import * as actions from './position-actions';
import * as fileActions from '../interactive-file-actions';
import * as rowActions from './rows-actions';
import * as searchActions from './search-actions';

const DefaultState = {
  x: 0,
  y: 0,
};

describe('Position set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = DefaultState;
    expect(PositionReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...DefaultState,
    };
    expect(PositionReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const action = {
      file: {
        position: {
          x: 5,
          y: 10,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      x: 5,
      y: 10,
    };
    expect(PositionReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_SEARCH_RESULTS action', () => {
    const action = {
      type: searchActions.SET_SEARCH_RESULTS,
      position: {
        x: 2,
        y: 3,
      },
    };
    expect(PositionReducer(undefined, action)).toEqual({ x: 2, y: 3 });
  });

  it('should handle UPDATE_POSITION action', () => {
    const action = {
      type: actions.UPDATE_POSITION,
      x: 1,
      y: 4,
    };
    expect(PositionReducer(undefined, action)).toEqual({ x: 1, y: 4 });
  });

  it('should handle UPDATE_ROWS action', () => {
    const action = {
      type: rowActions.UPDATE_ROWS,
    };
    expect(PositionReducer({ x: 5, y: 4 }, action)).toEqual({ x: 5, y: 0 });
  });
});
