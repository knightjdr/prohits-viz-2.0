import * as actions from './dimension-actions';
import * as fileActions from '../../interactive-file-actions';
import * as tabActions from '../../visualization/tab-actions';

import dimension, { initState } from './dimension-reducer';

describe('Customize dimension set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = initState;
    expect(dimension(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = initState;
    expect(dimension(undefined, action)).toEqual(expectedState);
  });

  describe('when removing tab', () => {
    const currentState = {
      columns: 40,
      height: 500,
      pageX: 30,
      pageY: 20,
      rows: 40,
      width: 500,
    };

    it('should reset state when removed tab is "customize"', () => {
      const action = {
        tab: 'customize',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = initState;
      expect(dimension(currentState, action)).toEqual(expectedState);
    });

    it('should not reset state when removed tab is not "customize"', () => {
      const action = {
        tab: 'other',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = currentState;
      expect(dimension(currentState, action)).toEqual(expectedState);
    });
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
    expect(dimension(undefined, action)).toEqual(expectedState);
  });
});
