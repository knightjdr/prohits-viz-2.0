import MapSelector from './map-selector';

describe('Minimap selector', () => {
  it('should return the minimap data uri string', () => {
    const state = {
      minimap: {
        someParam: 'test',
        someParam2: 'test2',
      },
    };
    expect(MapSelector(state)).toEqual(state.minimap);
  });
});
