import fillSave from './fill__save';

describe('Fill save', () => {
  it('should return default when nothing passed to function', () => {
    const expected = {
      imageType: 'svg',
      name: '',
    };
    expect(fillSave()).toEqual(expected);
  });

  it('should return user input when valid', () => {
    const user = {
      imageType: 'pdf',
      name: 'name',
    };
    expect(fillSave(user)).toEqual(user);
  });

  it('should return default when imageType invalid', () => {
    const expected = {
      imageType: 'svg',
      name: 'name',
    };
    const user = {
      imageType: 'jpg',
      name: 'name',
    };
    expect(fillSave(user)).toEqual(expected);
  });

  it('should return default when name invalid', () => {
    const expected = {
      imageType: 'pdf',
      name: '',
    };
    const user = {
      imageType: 'pdf',
      name: 1,
    };
    expect(fillSave(user)).toEqual(expected);
  });
});
