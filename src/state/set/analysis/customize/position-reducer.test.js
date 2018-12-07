import * as actions from './position-actions';
import * as dataActions from './data-actions';
import * as fileActions from '../../interactive-file-actions';
import * as rowActions from './rows-actions';
import * as searchActions from '../../visualization/search-actions';
import * as tabActions from '../../visualization/tab-actions';

import position, { initState } from './position-reducer';

describe('Position set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = initState;
    expect(position(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...initState,
    };
    expect(position(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const action = {
      file: {
        positionCustomize: {
          x: 5,
          y: 10,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      x: 5,
      y: 10,
    };
    expect(position(undefined, action)).toEqual(expectedState);
  });

  describe('when removing tab', () => {
    const currentState = {
      x: 5,
      y: 5,
    };

    it('should reset state when removed tab is "customize"', () => {
      const action = {
        tab: 'customize',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = initState;
      expect(position(currentState, action)).toEqual(expectedState);
    });

    it('should not reset state when removed tab is not "customize"', () => {
      const action = {
        tab: 'other',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = currentState;
      expect(position(currentState, action)).toEqual(expectedState);
    });
  });

  it('should handle RESET_CUSTOMIZE_STATE action', () => {
    const action = {
      type: dataActions.RESET_CUSTOMIZE_STATE,
    };
    const currentState = {
      x: 5,
      y: 5,
    };
    const expectedState = initState;
    expect(position(currentState, action)).toEqual(expectedState);
  });

  it('should handle SORT_CUSTOMIZE_STATE action', () => {
    const action = {
      type: rowActions.SORT_CUSTOMIZE_STATE,
    };
    const currentState = {
      x: 5,
      y: 5,
    };
    const expectedState = {
      x: 5,
      y: 0,
    };
    expect(position(currentState, action)).toEqual(expectedState);
  });

  it('should handle SET_SEARCH_RESULTS action', () => {
    const action = {
      positionCustomize: { x: 10, y: 10 },
      type: searchActions.SET_SEARCH_RESULTS,
    };
    const currentState = {
      x: 5,
      y: 5,
    };
    const expectedState = {
      x: 10,
      y: 10,
    };
    expect(position(currentState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_CUSTOMIZE_POSITION action', () => {
    const action = {
      type: actions.UPDATE_CUSTOMIZE_POSITION,
      x: 1,
      y: 4,
    };
    const expectedState = { x: 1, y: 4 };
    expect(position(undefined, action)).toEqual(expectedState);
  });
});
