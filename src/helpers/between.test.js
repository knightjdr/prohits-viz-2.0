import between from './between';

describe('Between function', () => {
  it('should return a value when it is between a min and a max', () => {
    expect(between(4, -2, 31)).toBe(4);
  });

  it('should return the min when value equals min', () => {
    expect(between(-2, -2, 31)).toBe(-2);
  });

  it('should return the min when value is less than min', () => {
    expect(between(-8, -2, 31)).toBe(-2);
  });

  it('should return the max when value equals max', () => {
    expect(between(31, -2, 31)).toBe(31);
  });

  it('should return the max when value is greater than min', () => {
    expect(between(100, -2, 31)).toBe(31);
  });
});
