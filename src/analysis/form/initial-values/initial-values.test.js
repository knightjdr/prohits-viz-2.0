import InitialValues from './initial-values';

describe('Initial form values', () => {
  it('should return intial values object for valid analysis type', () => {
    const initialValues = InitialValues('dotplot');
    expect(Object.keys(initialValues).length).toBeGreaterThan(0);
  });

  it('should return empty object for unknown analysis type', () => {
    const initialValues = InitialValues('test');
    expect(Object.keys(initialValues).length).toBe(0);
  });
});
