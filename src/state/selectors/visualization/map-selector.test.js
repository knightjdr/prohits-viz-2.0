import mapSelector, { mapSelectorProp } from './map-selector';

const state = {
  minimap: {
    image: 'image',
    synced: true,
  },
};

describe('Minimap selector', () => {
  it('should return the minimap data', () => {
    expect(mapSelector(state)).toEqual(state.minimap);
  });

  it('should return the minimap image prop', () => {
    expect(mapSelectorProp(state, 'image')).toEqual(state.minimap.image);
  });
});
