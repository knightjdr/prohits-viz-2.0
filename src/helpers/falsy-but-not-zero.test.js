import FalsyButNotZero from './falsy-but-not-zero';

describe('FalsyButNotZero', () => {
  test('False should return true', () => {
    expect(FalsyButNotZero(false)).toBeTruthy();
  });

  test('Null should return true', () => {
    expect(FalsyButNotZero(null)).toBeTruthy();
    expect(FalsyButNotZero()).toBeTruthy();
  });

  test('Undefined should return true', () => {
    expect(FalsyButNotZero(undefined)).toBeTruthy();
  });

  test('Empty string should return true', () => {
    expect(FalsyButNotZero('')).toBeTruthy();
  });

  test('Zero should be false', () => {
    expect(FalsyButNotZero(0)).toBeFalsy();
  });

  test('Anything else should be false', () => {
    expect(FalsyButNotZero(3)).toBeFalsy();
    expect(FalsyButNotZero('test')).toBeFalsy();
    expect(FalsyButNotZero([])).toBeFalsy();
    expect(FalsyButNotZero({})).toBeFalsy();
  });
});
