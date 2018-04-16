import DefaultPrimaryFilter from './default-primary-filter';

describe('DefaultPrimaryFilter', () => {
  test('Valid analysis type and score column returns default value', () => {
    expect(DefaultPrimaryFilter('dotplot', 'avgp')).toBe(0.9);
  });

  test('Invalid analysis type returns 0.01', () => {
    expect(DefaultPrimaryFilter('test', 'avgp')).toBe(0.01);
  });

  test('Unrecognized score returns 0.01', () => {
    expect(DefaultPrimaryFilter('dotplot', 'test')).toBe(0.01);
  });

  test('Uppercase score column returns default value', () => {
    expect(DefaultPrimaryFilter('dotplot', 'AVGP')).toBe(0.9);
  });
});
