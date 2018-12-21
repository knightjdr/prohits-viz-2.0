import display, { defaultState } from './display-reducer';
import * as actions from './display-actions';
import * as mapActions from './map-actions';

describe('Display set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(display(undefined, action)).toEqual(expectedState);
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
    expect(display(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_MAP_ATTACH action', () => {
    const action = {
      type: mapActions.TOGGLE_MAP_ATTACH,
    };
    const expectedState = {
      ...defaultState,
      opaque: true,
      visible: true,
    };
    expect(display(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_MAP_OPACITY action', () => {
    const action = {
      type: actions.TOGGLE_MAP_OPACITY,
    };
    const expectedState = {
      ...defaultState,
      opaque: false,
      visible: true,
    };
    expect(display(defaultState, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_MAP_VISIBILITY action', () => {
    const action = {
      type: actions.TOGGLE_MAP_VISIBILITY,
    };
    const expectedState = {
      ...defaultState,
      opaque: true,
      visible: false,
    };
    expect(display(defaultState, action)).toEqual(expectedState);
  });

  it('should handle RESET_MAP_POSITION action', () => {
    const action = {
      type: actions.RESET_MAP_POSITION,
    };
    const expectedState = {
      ...defaultState,
      floatMapRight: 10,
      floatMapTop: 10,
    };
    expect(display(undefined, action)).toEqual(expectedState);
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
    expect(display(undefined, action)).toEqual(expectedState);
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
    expect(display(undefined, action)).toEqual(expectedState);
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
    expect(display(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_MAP_SIZE action', () => {
    const action = {
      height: 500,
      width: 600,
      type: actions.UPDATE_MAP_SIZE,
    };
    const expectedState = {
      ...defaultState,
      height: 500,
      width: 600,
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
      ...defaultState,
      plotFixed: true,
      plotTranslate: -200,
    };
    expect(display(undefined, action)).toEqual(expectedState);
  });
});
