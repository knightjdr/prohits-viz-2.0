import MapReducer from './map-reducer';
import * as actions from './map-actions';

const DefaultState = {
  image: null,
  showAnnotations: false,
};

describe('MapReducer set reducer', () => {
  it('should return an empty initial state', () => {
    expect(MapReducer(undefined, {})).toEqual(DefaultState);
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
