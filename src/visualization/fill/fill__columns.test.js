import fillColumns from './fill__columns';

describe('Fill columns', () => {
  it('should return user values when valid', () => {
    const user = {
      names: ['a', 'b', 'c'],
      ref: 'a',
    };
    expect(fillColumns(user)).toEqual(user);
  });

  it('should return null for ref when not in names array', () => {
    const expected = {
      names: ['a', 'b', 'c'],
      ref: null,
    };
    const user = {
      names: ['a', 'b', 'c'],
      ref: 'd',
    };
    expect(fillColumns(user)).toEqual(expected);
  });

  it('should return defaults when inputs are invalid', () => {
    const expected = {
      names: [],
      ref: null,
    };
    const user = {
      names: {},
      ref: 1,
    };
    expect(fillColumns(user)).toEqual(expected);
  });
});
