import SetRange from './set-range';

let range;

beforeAll(() => {
  range = SetRange(0, 50, 0, 100);
});

describe('Set range', () => {
  it('should return a function', () => {
    expect(typeof range).toBe('function');
  });

  it('should map in bounds numbers to output range', () => {
    expect(range(0)).toBe(0);
    expect(range(10)).toBe(20);
    expect(range(25)).toBe(50);
    expect(range(40)).toBe(80);
    expect(range(50)).toBe(100);
  });

  it('should round output number to nearest integer', () => {
    expect(range(0.2)).toBe(0);
    expect(range(0.3)).toBe(1);
    expect(range(25.73)).toBe(51);
    expect(range(49.99)).toBe(100);
  });

  it('should map out of bounds numbers to limits of output range', () => {
    expect(range(-1)).toBe(0);
    expect(range(51)).toBe(100);
  });
});
