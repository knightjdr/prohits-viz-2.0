import defaultPrimaryFilter from './default-primary-filter';

describe('DefaultPrimaryFilter', () => {
  it('should return default value for valid file type and score column', () => {
    expect(defaultPrimaryFilter('saint', 'avgp')).toBe(0.9);
  });

  it('should return 0.01 for invalid file type', () => {
    expect(defaultPrimaryFilter('test', 'avgp')).toBe(0.01);
  });

  it('should return 0.01 for unrecognized score', () => {
    expect(defaultPrimaryFilter('saint', 'test')).toBe(0.01);
  });

  it('should return default value for uppercase score column', () => {
    expect(defaultPrimaryFilter('saint', 'AVGP')).toBe(0.9);
  });
});
