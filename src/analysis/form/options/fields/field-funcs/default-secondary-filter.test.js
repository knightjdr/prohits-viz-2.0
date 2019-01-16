import defaultSecondaryFilter from './default-secondary-filter';

describe('DefaultSecondaryFilter', () => {
  it('should return default value for valid file type and score column', () => {
    expect(defaultSecondaryFilter('saint', 'avgp')).toBe(0.8);
  });

  it('should return 0.05 for invalid file type', () => {
    expect(defaultSecondaryFilter('test', 'avgp')).toBe(0.05);
  });

  it('should return 0.05 for unrecognized score', () => {
    expect(defaultSecondaryFilter('saint', 'test')).toBe(0.05);
  });

  it('should return default value for uppercase score column', () => {
    expect(defaultSecondaryFilter('saint', 'AVGP')).toBe(0.8);
  });
});
