import SaveReducer from './save-reducer';
import * as actions from './save-actions';
import * as fileActions from '../interactive-file-actions';

const DefaultState = {
  imageType: 'svg',
  name: '',
};

describe('Save set reducer', () => {
  it('should return a default initial state', () => {
    const action = {};
    const expectedState = DefaultState;
    expect(SaveReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...DefaultState,
    };
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
      imageType: 'png',
      name: 'test',
    };
    expect(SaveReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SAVE_IMAGE_TYPE action', () => {
    const action = {
      imageType: 'png',
      type: actions.SAVE_IMAGE_TYPE,
    };
    const expectedState = {
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
      imageType: 'svg',
      name: 'testname',
    };
    expect(SaveReducer(undefined, action)).toEqual(expectedState);
  });
});
