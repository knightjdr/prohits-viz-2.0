import TestMap from '../../../visualization/test-files/map';
import MapReducer from './map-reducer';
import * as actions from './map-actions';

const DefaultState = {
  image: TestMap,
  showAnnotations: false,
};

describe('MapReducer set reducer', () => {
  it('should return an empty initial state', () => {
    expect(MapReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle TOGGLE_ANNOTATIONS', () => {
    const expectedState = {
      image: TestMap,
      showAnnotations: true,
    };
    expect(MapReducer(undefined, {
      type: actions.TOGGLE_ANNOTATIONS,
    })).toEqual(expectedState);
  });
});
