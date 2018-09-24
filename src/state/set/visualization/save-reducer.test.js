import SaveReducer, { defaultState } from './save-reducer';
import * as actions from './save-actions';
import * as asyncActions from '../../post/save-image/save-actions';
import * as fileActions from '../interactive-file-actions';

describe('Save set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(SaveReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = defaultState;
    expect(SaveReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const action = {
      file: {
        save: {
          imageType: 'png',
          name: 'test',
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...defaultState,
      imageType: 'png',
      name: 'test',
    };
    expect(SaveReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SAVED_IMAGE action', () => {
    const action = {
      task: 'test',
      type: asyncActions.SAVED_IMAGE,
    };
    const expectedState = {
      ...defaultState,
      didSave: true,
      task: 'test',
    };
    expect(SaveReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SAVE_ERROR action', () => {
    const action = {
      type: asyncActions.SAVE_ERROR,
    };
    const expectedState = {
      ...defaultState,
      error: true,
    };
    expect(SaveReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SAVING_IMAGE action', () => {
    const action = {
      type: asyncActions.SAVING_IMAGE,
    };
    const expectedState = {
      ...defaultState,
      isSaving: true,
    };
    expect(SaveReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SAVE_IMAGE_TYPE action', () => {
    const action = {
      imageType: 'png',
      type: actions.SAVE_IMAGE_TYPE,
    };
    const expectedState = {
      ...defaultState,
      imageType: 'png',
      name: '',
    };
    expect(SaveReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SAVE_SESSION_NAME action', () => {
    const action = {
      name: 'testname',
      type: actions.SAVE_SESSION_NAME,
    };
    const expectedState = {
      ...defaultState,
      imageType: 'svg',
      name: 'testname',
    };
    expect(SaveReducer(undefined, action)).toEqual(expectedState);
  });
});
