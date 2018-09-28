import TabReducer, { defaultState } from './tab-reducer';
import * as actions from './tab-actions';
import * as fileActions from '../interactive-file-actions';


describe('Tab set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(TabReducer(undefined, action)).toEqual(expectedState);
  });

  describe('ADD_TAB action', () => {
    it('should add tab that is not currently present', () => {
      const action = {
        tab: 'customize',
        type: actions.ADD_TAB,
      };
      const expectedState = {
        available: ['main', 'customize'],
        selected: 'customize',
        show: true,
      };
      expect(TabReducer(undefined, action)).toEqual(expectedState);
    });

    it('should not add tab that is already present', () => {
      const action = {
        tab: 'customize',
        type: actions.ADD_TAB,
      };
      const expectedState = {
        available: ['main', 'customize'],
        selected: 'customize',
        show: true,
      };
      const initialState = {
        available: ['main', 'customize'],
        selected: 'main',
        show: true,
      };
      expect(TabReducer(initialState, action)).toEqual(expectedState);
    });
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = defaultState;
    const initialState = {
      available: ['main', 'customize'],
      selected: 'main',
      show: true,
    };
    expect(TabReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const action = {
      file: {
        tabs: {
          available: ['main', 'go'],
          selected: 'main',
          show: false,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      available: ['main', 'go'],
      selected: 'main',
      show: false,
    };
    expect(TabReducer(undefined, action)).toEqual(expectedState);
  });

  describe('REMOVE_TAB action', () => {
    it('should remove tab that is not currently selected', () => {
      const action = {
        tab: 'customize',
        type: actions.REMOVE_TAB,
      };
      const expectedState = {
        ...defaultState,
      };
      const initialState = {
        available: ['main', 'customize'],
        selected: 'main',
        show: true,
      };
      expect(TabReducer(initialState, action)).toEqual(expectedState);
    });

    it('should remove tab that is currently selected', () => {
      const action = {
        tab: 'customize',
        type: actions.REMOVE_TAB,
      };
      const expectedState = {
        ...defaultState,
      };
      const initialState = {
        available: ['main', 'customize'],
        selected: 'customize',
        show: true,
      };
      expect(TabReducer(initialState, action)).toEqual(expectedState);
    });
  });

  it('should handle SET_TAB action', () => {
    const action = {
      tab: 'customize',
      type: actions.SET_TAB,
    };
    const expectedState = {
      available: ['main', 'customize'],
      selected: 'customize',
      show: true,
    };
    const initialState = {
      available: ['main', 'customize'],
      selected: 'main',
      show: true,
    };
    expect(TabReducer(initialState, action)).toEqual(expectedState);
  });
});
