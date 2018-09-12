import DisplayReducer from './display-reducer';
import * as actions from './display-actions';

const defaultState = {
  floatMapRight: 50,
  floatMapTop: 100,
  plotFixed: false,
  plotTranslate: 0,
};

describe('Display set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(DisplayReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_CUSTOMIZE_PLOT_POSITION action', () => {
    const action = {
      fixed: true,
      translate: -200,
      type: actions.UPDATE_CUSTOMIZE_PLOT_POSITION,
    };
    const expectedState = {
      ...defaultState,
      plotFixed: true,
      plotTranslate: -200,
    };
    expect(DisplayReducer(undefined, action)).toEqual(expectedState);
  });
});
