import ValidationDefault from './validation-default';

describe('ValidationDefault', () => {
  test('Missing values should return errors', () => {
    const errors = ValidationDefault({});
    expect(Object.prototype.hasOwnProperty.call(errors, 'fileType')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'file')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'analysisType')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'abundance')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'condition')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'readout')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'score')).toBeTruthy();
  });

  test('Invalid file type returns an error', () => {
    const errors = ValidationDefault({ fileType: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'fileType')).toBeTruthy();
  });

  test('Empty file array returns an error', () => {
    const errors = ValidationDefault({ file: [] });
    expect(Object.prototype.hasOwnProperty.call(errors, 'file')).toBeTruthy();
  });

  test('Invalid analysis type returns an error', () => {
    const errors = ValidationDefault({ analysisType: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'analysisType')).toBeTruthy();
  });

  test('Correct values returns no errors', () => {
    const errors = ValidationDefault({
      fileType: 'saint',
      file: ['test'],
      analysisType: 'dotplot',
      abundance: 'test',
      condition: 'test',
      readout: 'test',
      score: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'fileType')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'file')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'analysisType')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'abundance')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'condition')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'readout')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'score')).toBeFalsy();
  });
});
