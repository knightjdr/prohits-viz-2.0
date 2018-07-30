import MapReducer from './map-reducer';
import * as actions from './map-actions';
import * as fileActions from '../interactive-file-actions';

const DefaultState = {
  image: null,
  showAnnotations: false,
};

describe('Map set reducer', () => {
  it('should return an empty initial state', () => {
    const action = {};
    const expectedState = DefaultState;
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...DefaultState,
    };
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const action = {
      file: {
        minimap: {
          image: 'image',
          showAnnotations: true,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      image: 'image',
      showAnnotations: true,
    };
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_ANNOTATIONS action', () => {
    const action = {
      type: actions.TOGGLE_ANNOTATIONS,
    };
    const expectedState = {
      image: null,
      showAnnotations: true,
    };
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });
});
