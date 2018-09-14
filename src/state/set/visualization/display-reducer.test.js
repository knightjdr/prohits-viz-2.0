import display, { initState } from './display-reducer';
import * as actions from './display-actions';

describe('Display set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = initState;
    expect(display(undefined, action)).toEqual(expectedState);
  });

  it('should handle CHANGE_PANEL_TAB action', () => {
    const action = {
      tab: 'map',
      type: actions.CHANGE_PANEL_TAB,
    };
    const expectedState = {
      ...initState,
      tab: 'map',
    };
    expect(display(undefined, action)).toEqual(expectedState);
  });

  it('should handle RESET_MAP_POSITION action', () => {
    const action = {
      type: actions.RESET_MAP_POSITION,
    };
    const expectedState = {
      ...initState,
      floatMapRight: 20,
      floatMapTop: 100,
    };
    expect(display(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_SELECTION_BOX action', () => {
    const action = {
      type: actions.TOGGLE_SELECTION_BOX,
    };
    const expectedState = {
      ...initState,
      selectionBox: false,
      tooltips: true,
    };
    expect(display(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_TOOLTIPS action', () => {
    const action = {
      type: actions.TOGGLE_TOOLTIPS,
    };
    const expectedState = {
      ...initState,
      selectionBox: false,
      tooltips: true,
    };
    expect(display(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_MAP_POSITION action', () => {
    const action = {
      right: 100,
      top: 200,
      type: actions.UPDATE_MAP_POSITION,
    };
    const expectedState = {
      ...initState,
      floatMapRight: 100,
      floatMapTop: 200,
    };
    expect(display(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_PLOT_POSITION action', () => {
    const action = {
      fixed: true,
      translate: -200,
      type: actions.UPDATE_PLOT_POSITION,
    };
    const expectedState = {
      ...initState,
      plotFixed: true,
      plotTranslate: -200,
    };
    expect(display(undefined, action)).toEqual(expectedState);
  });
});
