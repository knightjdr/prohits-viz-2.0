import DimensionReducer from './dimension-reducer';
import * as actions from './dimension-actions';

describe('Dimension set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = {
      columns: 0,
      pageX: 0,
      pageY: 0,
      rows: 0,
    };
    expect(DimensionReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_DIMENSIONS action', () => {
    const action = {
      columns: 40,
      pageX: 30,
      pageY: 20,
      rows: 40,
      type: actions.SET_DIMENSIONS,
    };
    const expectedState = {
      columns: 40,
      pageX: 30,
      pageY: 20,
      rows: 40,
    };
    expect(DimensionReducer(undefined, action)).toEqual(expectedState);
  });
});
