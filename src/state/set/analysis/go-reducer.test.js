import Go, { defaultState } from './go-reducer';
import * as actions from './go-actions';
import * as fileActions from '../interactive-file-actions';
import * as tabActions from '../visualization/tab-actions';

describe('Analysis GO table set reducer', () => {
  it('should return initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(Go(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_GO_ANNOTATION action', () => {
    const action = {
      type: actions.CLEAR_GO_ANNOTATION,
    };
    const expectedState = {
      ...defaultState,
      annotation: '',
    };
    expect(Go(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = { ...defaultState };
    expect(Go(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const action = {
      file: {
        go: { annotation: 'test' },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = { annotation: 'test' };
    expect(Go(undefined, action)).toEqual(expectedState);
  });

  describe('when removing tab', () => {
    it('should return default state when removed tab is the "go" tab', () => {
      const action = {
        tab: 'go',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = { ...defaultState };
      expect(Go({ annotation: 'test' }, action)).toEqual(expectedState);
    });

    it('should return current state when removed tab is not the "go" tab', () => {
      const action = {
        tab: 'other',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = { annotation: 'test' };
      expect(Go({ annotation: 'test' }, action)).toEqual(expectedState);
    });
  });

  it('should handle SET_GO_ANNOTATION action', () => {
    const action = {
      text: 'text',
      type: actions.SET_GO_ANNOTATION,
    };
    const expectedState = {
      ...defaultState,
      annotation: 'text',
    };
    expect(Go(undefined, action)).toEqual(expectedState);
  });
});
