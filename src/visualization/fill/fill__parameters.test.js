import fillParameters from './fill__parameters';

describe('Fill parameters', () => {
  it('should return default when nothing passed to function', () => {
    const expected = {
      imageType: null,
      name: undefined,
    };
    expect(fillParameters()).toEqual(expected);
  });

  it('should return user input when valid', () => {
    const user = {
      imageType: 'dotplot',
      name: 'name',
      other: 'test',
    };
    expect(fillParameters(user)).toEqual(user);
  });

  it('should return default when image type is missing', () => {
    const expected = {
      imageType: null,
      name: 'name',
      other: 'test',
    };
    const user = {
      name: 'name',
      other: 'test',
    };
    expect(fillParameters(user)).toEqual(expected);
  });

  it('should return default when image type is invalid', () => {
    const expected = {
      imageType: null,
      name: 'name',
      other: 'test',
    };
    const user = {
      imageType: 'unknown',
      name: 'name',
      other: 'test',
    };
    expect(fillParameters(user)).toEqual(expected);
  });

  it('should return filename when name is missing', () => {
    const expected = {
      imageType: 'heatmap',
      name: 'filename',
      other: 'test',
    };
    const user = {
      imageType: 'heatmap',
      other: 'test',
    };
    expect(fillParameters(user, 'filename')).toEqual(expected);
  });
});
