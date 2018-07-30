import PositionReducer from './position-reducer';
import * as actions from './position-actions';
import * as fileActions from '../interactive-file-actions';

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
          x: 0.3,
          y: 0.4,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      x: 0.3,
      y: 0.4,
    };
    expect(PositionReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_POSITION action', () => {
    const action = {
      type: actions.UPDATE_POSITION,
      x: 0.5,
      y: 0.5,
    };
    expect(PositionReducer(undefined, action)).toEqual({ x: 0.5, y: 0.5 });
  });

  it('should handle UPDATE_ROWS action', () => {
    const action = {
      type: actions.UPDATE_ROWS,
    };
    expect(PositionReducer(undefined, action)).toEqual({ x: 0, y: 0 });
  });
});
