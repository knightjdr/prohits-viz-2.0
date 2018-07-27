import DimensionReducer from './dimension-reducer';
import * as actions from './dimension-actions';

const DefaultState = {
  columns: 0,
  pageX: 0,
  pageY: 0,
  rows: 0,
};

describe('Dimension set reducer', () => {
  it('should return a default initial state', () => {
    expect(DimensionReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle SET_DIMENSIONS', () => {
    expect(DimensionReducer(undefined, {
      columns: 40,
      pageX: 30,
      pageY: 20,
      rows: 40,
      type: actions.SET_DIMENSIONS,
    })).toEqual({
      columns: 40,
      pageX: 30,
      pageY: 20,
      rows: 40,
    });
  });
});
