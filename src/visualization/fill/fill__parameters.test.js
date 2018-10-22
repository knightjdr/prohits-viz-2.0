import fillParameters from './fill__parameters';

const defaultState = {
  abundanceColumn: 'Abundance',
  imageType: null,
  name: undefined,
  scoreColumn: 'Score',
  scoreType: 'lte',
};

describe('Fill parameters', () => {
  it('should return default when nothing passed to function', () => {
    expect(fillParameters()).toEqual(defaultState);
  });

  it('should return user input when valid', () => {
    const expectedState = {
      ...defaultState,
      abundanceColumn: 'Value',
      imageType: 'dotplot',
      name: 'name',
      other: 'test',
      scoreColumn: 'FDR',
      scoreType: 'gte',
    };
    const user = {
      abundanceColumn: 'Value',
      imageType: 'dotplot',
      name: 'name',
      other: 'test',
      scoreColumn: 'FDR',
      scoreType: 'gte',
    };
    expect(fillParameters(user)).toEqual(expectedState);
  });

  it('should return default when image type is missing', () => {
    const expected = {
      ...defaultState,
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
      ...defaultState,
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
      ...defaultState,
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
