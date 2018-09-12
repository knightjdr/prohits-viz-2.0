import DimensionReducer from './dimension-reducer';
import * as actions from './dimension-actions';

describe('Customize dimension set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = {
      columns: 0,
      height: 0,
      pageX: 0,
      pageY: 0,
      rows: 0,
      width: 0,
    };
    expect(DimensionReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_CUSTOMIZE_DIMENSIONS action', () => {
    const action = {
      columns: 40,
      height: 500,
      pageX: 30,
      pageY: 20,
      rows: 40,
      type: actions.SET_CUSTOMIZE_DIMENSIONS,
      width: 500,
    };
    const expectedState = {
      columns: 40,
      height: 500,
      pageX: 30,
      pageY: 20,
      rows: 40,
      width: 500,
    };
    expect(DimensionReducer(undefined, action)).toEqual(expectedState);
  });
});
