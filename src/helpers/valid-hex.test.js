import ValidHex from './valid-hex';

describe('Valid hex color', () => {
  it('should return true for valid 6 digit hex colors', () => {
    expect(ValidHex('#000000')).toBeTruthy();
    expect(ValidHex('#ff0000')).toBeTruthy();
    expect(ValidHex('#f44336')).toBeTruthy();
    expect(ValidHex('#ffffff')).toBeTruthy();
  });

  it('should return true for valid 3 digit hex colors', () => {
    expect(ValidHex('#000')).toBeTruthy();
    expect(ValidHex('#f00')).toBeTruthy();
    expect(ValidHex('#fff')).toBeTruthy();
  });

  it('should return false for invalid hex colors', () => {
    expect(ValidHex('000000')).toBeFalsy();
    expect(ValidHex('asdfsadfas')).toBeFalsy();
    expect(ValidHex('#f4')).toBeFalsy();
    expect(ValidHex('#fffffff')).toBeFalsy();
  });
});
