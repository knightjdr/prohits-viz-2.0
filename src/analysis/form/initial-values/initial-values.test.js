import InitialValues from './initial-values';

describe('InitialValues', () => {
  test('Valid analysis type returns intial values object', () => {
    const initialValues = InitialValues('dotplot');
    expect(Object.keys(initialValues).length).toBeGreaterThan(0);
  });

  test('Unknown analysis type returns intial values object', () => {
    const initialValues = InitialValues('test');
    expect(Object.keys(initialValues).length).toBe(0);
  });
});
