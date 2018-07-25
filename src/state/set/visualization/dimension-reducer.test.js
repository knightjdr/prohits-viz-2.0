import DimensionReducer from './dimension-reducer';
import * as actions from './dimension-actions';

const DefaultState = {
  height: 0,
  pageX: 0,
  pageY: 0,
  width: 0,
};

describe('Dimension set reducer', () => {
  it('should return a default initial state', () => {
    expect(DimensionReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle SET_DIMENSIONS', () => {
    expect(DimensionReducer(undefined, {
      height: 0.5,
      pageX: 30,
      pageY: 20,
      type: actions.SET_DIMENSIONS,
      width: 0.5,
    })).toEqual({
      height: 0.5,
      pageX: 30,
      pageY: 20,
      width: 0.5,
    });
  });
});
