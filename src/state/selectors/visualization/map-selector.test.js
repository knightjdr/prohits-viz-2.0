import MapSelector from './map-selector';

describe('Minimap selector', () => {
  it('should return the minimap data uri string', () => {
    const state = {
      minimap: {
        image: 'image',
        synced: true,
      },
    };
    expect(MapSelector(state)).toEqual(state.minimap);
  });
});
