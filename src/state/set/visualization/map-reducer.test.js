import MapReducer from './map-reducer';
import * as actions from './map-actions';
import * as fileActions from '../interactive-file-actions';

const DefaultState = {
  image: null,
  showAnnotations: false,
};

describe('MapReducer set reducer', () => {
  it('should return an empty initial state', () => {
    expect(MapReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE', () => {
    const expectedState = {
      ...DefaultState,
    };
    expect(MapReducer(undefined, {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE', () => {
    const expectedState = {
      image: 'image',
      showAnnotations: true,
    };
    expect(MapReducer(undefined, {
      file: {
        minimap: {
          image: 'image',
          showAnnotations: true,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle TOGGLE_ANNOTATIONS', () => {
    const expectedState = {
      image: null,
      showAnnotations: true,
    };
    expect(MapReducer(undefined, {
      type: actions.TOGGLE_ANNOTATIONS,
    })).toEqual(expectedState);
  });
});
