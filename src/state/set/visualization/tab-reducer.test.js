import TabReducer from './tab-reducer';
import * as actions from './tab-actions';

const DefaultState = {
  available: ['main'],
  selected: 'main',
  show: false,
};

describe('Tab set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = DefaultState;
    expect(TabReducer(undefined, action)).toEqual(expectedState);
  });

  describe('REMOVE_TAB action', () => {
    it('should remove tab that is not currently selected', () => {
      const action = {
        tab: 'customize',
        type: actions.REMOVE_TAB,
      };
      const expectedState = {
        ...DefaultState,
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
        ...DefaultState,
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
