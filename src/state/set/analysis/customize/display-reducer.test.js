import * as actions from './display-actions';
import * as fileActions from '../../interactive-file-actions';
import * as tabActions from '../../visualization/tab-actions';

import display, { initState } from './display-reducer';

describe('Display set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = initState;
    expect(display(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = initState;
    expect(display(undefined, action)).toEqual(expectedState);
  });

  describe('when removing tab', () => {
    const currentState = {
      floatMapRight: 500,
      floatMapTop: 1000,
      plotFixed: true,
      plotTranslate: 0,
      tooltips: false,
    };

    it('should reset state when removed tab is "customize"', () => {
      const action = {
        tab: 'customize',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = initState;
      expect(display(currentState, action)).toEqual(expectedState);
    });

    it('should not reset state when removed tab is not "customize"', () => {
      const action = {
        tab: 'other',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = currentState;
      expect(display(currentState, action)).toEqual(expectedState);
    });
  });

  it('should handle TOGGLE_CUSTOMIZE_TOOLTIPS action', () => {
    const action = {
      type: actions.TOGGLE_CUSTOMIZE_TOOLTIPS,
    };
    const expectedState = {
      ...initState,
      tooltips: true,
    };
    expect(display(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_CUSTOMIZE_PLOT_POSITION action', () => {
    const action = {
      fixed: true,
      translate: -200,
      type: actions.UPDATE_CUSTOMIZE_PLOT_POSITION,
    };
    const expectedState = {
      ...initState,
      plotFixed: true,
      plotTranslate: -200,
    };
    expect(display(undefined, action)).toEqual(expectedState);
  });
});
