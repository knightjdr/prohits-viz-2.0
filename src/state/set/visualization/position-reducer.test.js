import PositionReducer from './position-reducer';
import * as actions from './position-actions';

describe('Position set reducer', () => {
  it('should return a default initial state', () => {
    expect(PositionReducer(undefined, {})).toEqual({ x: 0, y: 0 });
  });

  it('should handle UPDATE_POSITION', () => {
    expect(PositionReducer(undefined, {
      type: actions.UPDATE_POSITION,
      x: 0.5,
      y: 0.5,
    })).toEqual({ x: 0.5, y: 0.5 });
  });
});
