import DefaultSecondaryFilter from './default-secondary-filter';

describe('DefaultSecondaryFilter', () => {
  test('Valid analysis type and score column returns default value', () => {
    expect(DefaultSecondaryFilter('dotplot', 'avgp')).toBe(0.8);
  });

  test('Invalid analysis type returns 0.01', () => {
    expect(DefaultSecondaryFilter('test', 'avgp')).toBe(0.05);
  });

  test('Unrecognized score returns 0.01', () => {
    expect(DefaultSecondaryFilter('dotplot', 'test')).toBe(0.05);
  });

  test('Uppercase score column returns default value', () => {
    expect(DefaultSecondaryFilter('dotplot', 'AVGP')).toBe(0.8);
  });
});
