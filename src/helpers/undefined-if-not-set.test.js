import UndefinedIfNotSet from './undefined-if-not-set';

describe('UndefinedIfNotSet', () => {
  test('undefined is undefined', () => {
    expect(UndefinedIfNotSet(undefined)).toBeUndefined();
  });

  test('null is undefined', () => {
    expect(UndefinedIfNotSet()).toBeUndefined();
    expect(UndefinedIfNotSet()).toBeUndefined();
  });

  test('empty string is undefined', () => {
    expect(UndefinedIfNotSet('')).toBeUndefined();
  });

  test('Other values return themselves', () => {
    expect(UndefinedIfNotSet(0)).toBe(0);
    expect(UndefinedIfNotSet('a')).toBe('a');
    expect(UndefinedIfNotSet([])).toEqual([]);
    expect(UndefinedIfNotSet({})).toEqual({});
  });
});
