import PositionReducer from './position-reducer';
import * as actions from './position-actions';
import * as fileActions from '../interactive-file-actions';

const DefaultState = {
  x: 0,
  y: 0,
};

describe('Position set reducer', () => {
  it('should return a default initial state', () => {
    expect(PositionReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE', () => {
    const expectedState = {
      ...DefaultState,
    };
    expect(PositionReducer(undefined, {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE', () => {
    const expectedState = {
      x: 0.3,
      y: 0.4,
    };
    expect(PositionReducer(undefined, {
      file: {
        position: {
          x: 0.3,
          y: 0.4,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle UPDATE_POSITION', () => {
    expect(PositionReducer(undefined, {
      type: actions.UPDATE_POSITION,
      x: 0.5,
      y: 0.5,
    })).toEqual({ x: 0.5, y: 0.5 });
  });

  it('should handle UPDATE_ROWS', () => {
    expect(PositionReducer(undefined, {
      type: actions.UPDATE_ROWS,
    })).toEqual({ x: 0, y: 0 });
  });
});
