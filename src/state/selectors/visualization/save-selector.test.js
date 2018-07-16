import SaveSelector from './save-selector';

const state = {
  imageType: 'svg',
};

describe('Save selector', () => {
  it('should return save options', () => {
    expect(SaveSelector(state)).toEqual(state.save);
  });
});
