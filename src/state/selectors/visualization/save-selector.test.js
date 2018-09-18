import saveSelector from './save-selector';

describe('Save selector', () => {
  it('should return save options', () => {
    const state = {
      imageType: 'svg',
    };
    expect(saveSelector(state)).toEqual(state.save);
  });
});
