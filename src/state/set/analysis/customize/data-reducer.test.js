import * as actions from './data-actions';
import * as columnActions from './columns-actions';
import * as fileActions from '../../interactive-file-actions';
import * as rowActions from './rows-actions';
import * as tabActions from '../../visualization/tab-actions';

import data from './data-reducer';

const initState = {
  columns: {
    names: ['a', 'b', 'c'],
    ref: null,
  },
  direction: null,
  id: 0,
  removeEmpty: false,
  resetMaximums: false,
  rows: {
    list: [],
    order: [],
  },
  sortBy: null,
};

describe('Customize data reducer', () => {
  it('should return default initial state', () => {
    const action = {};
    const expectedState = [];
    expect(data(undefined, action)).toEqual(expectedState);
  });

  it('should handle ADD_CUSTOMIZE_STATE action', () => {
    const action = {
      columns: {
        names: ['d', 'e', 'f'],
        ref: 'd',
      },
      direction: null,
      removeEmpty: false,
      resetMaximums: false,
      rows: {
        list: [],
        order: [],
      },
      sortBy: null,
      type: actions.ADD_CUSTOMIZE_STATE,
    };
    const expectedState = [
      initState,
      {
        columns: {
          names: ['d', 'e', 'f'],
          ref: 'd',
        },
        direction: null,
        id: 1,
        removeEmpty: false,
        resetMaximums: false,
        rows: {
          list: [],
          order: [],
        },
        sortBy: null,
      },
    ];
    expect(data([initState], action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = [];
    expect(data(undefined, action)).toEqual(expectedState);
  });

  describe('parsing file', () => {
    it('should handle PARSE_INTERACTIVE_FILE action when customize field is present ', () => {
      const action = {
        file: { customize: [{ field: 'aaa' }] },
        type: fileActions.PARSE_INTERACTIVE_FILE,
      };
      const expectedState = [{ field: 'aaa' }];
      expect(data(undefined, action)).toEqual(expectedState);
    });

    it('should handle PARSE_INTERACTIVE_FILE action when customize field is not present ', () => {
      const action = {
        file: { },
        type: fileActions.PARSE_INTERACTIVE_FILE,
      };
      const expectedState = [];
      expect(data(undefined, action)).toEqual(expectedState);
    });
  });

  describe('when removing tab', () => {
    it('should return default state when removed tab is the "customize" tab', () => {
      const action = {
        tab: 'customize',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = [];
      expect(data([{ field: 'aaa' }], action)).toEqual(expectedState);
    });

    it('should return current state when removed tab is not the "customize" tab', () => {
      const action = {
        tab: 'other',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = [{ field: 'aaa' }];
      expect(data([{ field: 'aaa' }], action)).toEqual(expectedState);
    });
  });

  it('should handle REPLACE_CUSTOMIZE_STATE', () => {
    const action = {
      columns: {
        names: ['d', 'e', 'f'],
      },
      direction: null,
      removeEmpty: false,
      resetMaximums: false,
      rows: {
        list: [],
        order: [],
      },
      sortBy: null,
      type: actions.REPLACE_CUSTOMIZE_STATE,
    };
    const expectedState = [
      {
        columns: {
          names: ['d', 'e', 'f'],
          ref: undefined,
        },
        direction: null,
        id: 1,
        removeEmpty: false,
        resetMaximums: false,
        rows: {
          list: [],
          order: [],
        },
        sortBy: null,
      },
    ];
    expect(data([initState], action)).toEqual(expectedState);
  });

  it('should handle RESET_CUSTOMIZE_STATE', () => {
    const action = {
      type: actions.RESET_CUSTOMIZE_STATE,
    };
    const currentState = [
      initState,
      {
        columns: {
          names: ['d', 'e', 'f'],
          ref: undefined,
        },
        direction: null,
        id: 1,
        removeEmpty: false,
        resetMaximums: false,
        rows: {
          list: [],
          order: [],
        },
        sortBy: null,
      },
    ];
    const expectedState = [initState];
    expect(data(currentState, action)).toEqual(expectedState);
  });

  it('should handle SET_CUSTOMIZE_REFERENCE', () => {
    const action = {
      ref: 'a',
      type: columnActions.SET_CUSTOMIZE_REFERENCE,
    };
    const expectedState = [{
      ...initState,
      columns: {
        names: ['a', 'b', 'c'],
        ref: 'a',
      },
    }];
    expect(data([initState], action)).toEqual(expectedState);
  });

  it('should handle SET_CUSTOMIZE_STATE', () => {
    const action = {
      columns: ['d', 'e', 'f'],
      removeEmpty: false,
      resetMaximums: false,
      rows: {
        list: [],
        order: [],
      },
      type: actions.SET_CUSTOMIZE_STATE,
    };
    const expectedState = [
      {
        columns: {
          names: ['d', 'e', 'f'],
          ref: null,
        },
        id: 1,
        removeEmpty: false,
        resetMaximums: false,
        rows: {
          list: [],
          order: [],
        },
      },
    ];
    expect(data([initState], action)).toEqual(expectedState);
  });

  it('should handle SORT_CUSTOMIZE_STATE action', () => {
    const action = {
      columns: ['d', 'e', 'f'],
      direction: null,
      ref: 'd',
      removeEmpty: false,
      resetMaximums: false,
      rows: {
        list: [],
        order: [],
      },
      sortBy: null,
      type: rowActions.SORT_CUSTOMIZE_STATE,
    };
    const expectedState = [
      initState,
      {
        columns: {
          names: ['d', 'e', 'f'],
          ref: 'd',
        },
        direction: null,
        id: 1,
        removeEmpty: false,
        resetMaximums: false,
        rows: {
          list: [],
          order: [],
        },
        sortBy: null,
      },
    ];
    expect(data([initState], action)).toEqual(expectedState);
  });

  it('should handle UNDO_CUSTOMIZE_STATE', () => {
    const action = {
      type: actions.UNDO_CUSTOMIZE_STATE,
    };
    const currentState = [
      initState,
      {
        columns: {
          names: ['d', 'e', 'f'],
          ref: undefined,
        },
        direction: null,
        id: 1,
        removeEmpty: false,
        resetMaximums: false,
        rows: {
          list: [],
          order: [],
        },
        sortBy: null,
      },
    ];
    const expectedState = [initState];
    expect(data(currentState, action)).toEqual(expectedState);
  });
});
