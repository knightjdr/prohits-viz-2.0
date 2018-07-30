import SaveSelector from './save-selector';

describe('Save selector', () => {
  it('should return save options', () => {
    const state = {
      imageType: 'svg',
    };
    expect(SaveSelector(state)).toEqual(state.save);
  });
});
