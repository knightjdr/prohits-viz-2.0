import falsyButNotZero from '../../../helpers/falsy-but-not-zero';
import validationDotplot from './validation-dotplot';

jest.mock('../../../helpers/falsy-but-not-zero');

describe('validationDotplot', () => {
  describe('missing values', () => {
    let errors;

    beforeAll(() => {
      falsyButNotZero.mockReturnValue(true);
      errors = validationDotplot({});
    });

    it('should return error for abundanceCap', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'abundanceCap')).toBeTruthy();
    });

    it('should return error for fillColor', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'fillColor')).toBeTruthy();
    });
  });

  describe('valid submission', () => {
    let errors;

    beforeAll(() => {
      falsyButNotZero.mockReturnValue(false);
      errors = validationDotplot({
        abundanceCap: 50,
        fillColor: 'blueBlack',
      });
    });

    it('should return no error for abundanceCap', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'abundanceCap')).toBeFalsy();
    });

    it('should return no error for fillColor', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'fillColor')).toBeFalsy();
    });
  });

  it('should return an error when maximum abundance is not a number', () => {
    falsyButNotZero.mockReturnValue(false);
    const errors = validationDotplot({ abundanceCap: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'abundanceCap')).toBeTruthy();
  });

  it('should return an error for invalid fill color', () => {
    falsyButNotZero.mockReturnValue(true);
    const errors = validationDotplot({ fillColor: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'fillColor')).toBeTruthy();
  });
});
