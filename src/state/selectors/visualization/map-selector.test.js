import MapSelector from './map-selector';

const state = {
  minimap: {
    someParam: 'test',
    someParam2: 'test2',
  },
};

describe('Minimap selector', () => {
  it('should return the minimap data uri string', () => {
    expect(MapSelector(state)).toEqual(state.minimap);
  });
});
