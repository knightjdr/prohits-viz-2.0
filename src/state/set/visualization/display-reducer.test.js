import DisplayReducer from './display-reducer';
import * as actions from './display-actions';

const defaultState = {
  floatMapRight: 50,
  floatMapTop: 100,
  plotFixed: false,
  plotTranslate: 0,
  selectionBox: true,
  tab: 'info',
  tooltips: false,
};

describe('Display set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(DisplayReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CHANGE_PANEL_TAB action', () => {
    const action = {
      tab: 'map',
      type: actions.CHANGE_PANEL_TAB,
    };
    const expectedState = {
      ...defaultState,
      tab: 'map',
    };
    expect(DisplayReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle RESET_MAP_POSITION action', () => {
    const action = {
      type: actions.RESET_MAP_POSITION,
    };
    const expectedState = {
      ...defaultState,
      floatMapRight: 20,
      floatMapTop: 100,
    };
    expect(DisplayReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_SELECTION_BOX action', () => {
    const action = {
      type: actions.TOGGLE_SELECTION_BOX,
    };
    const expectedState = {
      ...defaultState,
      selectionBox: false,
      tooltips: true,
    };
    expect(DisplayReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_TOOLTIPS action', () => {
    const action = {
      type: actions.TOGGLE_TOOLTIPS,
    };
    const expectedState = {
      ...defaultState,
      selectionBox: false,
      tooltips: true,
    };
    expect(DisplayReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_MAP_POSITION action', () => {
    const action = {
      right: 100,
      top: 200,
      type: actions.UPDATE_MAP_POSITION,
    };
    const expectedState = {
      ...defaultState,
      floatMapRight: 100,
      floatMapTop: 200,
    };
    expect(DisplayReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_PLOT_POSITION action', () => {
    const action = {
      fixed: true,
      translate: -200,
      type: actions.UPDATE_PLOT_POSITION,
    };
    const expectedState = {
      ...defaultState,
      plotFixed: true,
      plotTranslate: -200,
    };
    expect(DisplayReducer(undefined, action)).toEqual(expectedState);
  });
});
