import IsNotEmpty from './is-not-empty';

describe('IsNotEmpty', () => {
  test('Null returns false', () => {
    expect(IsNotEmpty(null)).toBeFalsy();
  });

  test('Undefined returns false', () => {
    expect(IsNotEmpty(undefined)).toBeFalsy();
  });

  test('Empty returns false', () => {
    expect(IsNotEmpty()).toBeFalsy();
    expect(IsNotEmpty('')).toBeFalsy();
  });

  test('Empty array returns false', () => {
    expect(IsNotEmpty([])).toBeFalsy();
  });

  test('Empty object returns false', () => {
    expect(IsNotEmpty({})).toBeFalsy();
  });

  test('Zero returns true', () => {
    expect(IsNotEmpty(0)).toBeTruthy();
  });

  test('Number or string returns true', () => {
    expect(IsNotEmpty(1)).toBeTruthy();
    expect(IsNotEmpty('a')).toBeTruthy();
  });

  test('Array with length > 0 returns true', () => {
    expect(IsNotEmpty(['a'])).toBeTruthy();
  });

  test('Object with at least one key return true', () => {
    expect(IsNotEmpty({ key: 'test' })).toBeTruthy();
  });
});
