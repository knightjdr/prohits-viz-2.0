import DefaultState from '../../../visualization/test-files/map';
import MapReducer from './map-reducer';

describe('MapReducer set reducer', () => {
  it('should return an empty initial state', () => {
    expect(MapReducer(undefined, {})).toEqual(DefaultState);
  });
});
