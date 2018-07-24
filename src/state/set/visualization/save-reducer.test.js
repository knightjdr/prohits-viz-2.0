import SaveReducer from './save-reducer';
import * as actions from './save-actions';
import * as fileActions from '../interactive-file-actions';

const DefaultState = {
  imageType: 'svg',
  name: '',
};

describe('Save set reducer', () => {
  it('should return a default initial state', () => {
    expect(SaveReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE', () => {
    const expectedState = {
      ...DefaultState,
    };
    expect(SaveReducer(undefined, {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE', () => {
    const expectedState = {
      imageType: 'png',
      name: 'test',
    };
    expect(SaveReducer(undefined, {
      file: {
        save: {
          imageType: 'png',
          name: 'test',
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle SAVE_IMAGE_TYPE', () => {
    const expectedState = {
      imageType: 'png',
      name: '',
    };
    expect(SaveReducer(undefined, {
      imageType: 'png',
      type: actions.SAVE_IMAGE_TYPE,
    })).toEqual(expectedState);
  });

  it('should handle SAVE_SESSION_NAME', () => {
    const expectedState = {
      imageType: 'svg',
      name: 'testname',
    };
    expect(SaveReducer(undefined, {
      name: 'testname',
      type: actions.SAVE_SESSION_NAME,
    })).toEqual(expectedState);
  });
});
