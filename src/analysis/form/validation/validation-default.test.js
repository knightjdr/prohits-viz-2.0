import falsyButNotZero from '../../../helpers/falsy-but-not-zero';
import validationDefault from './validation-default';

jest.mock('../../../helpers/falsy-but-not-zero');

describe('validationDefault', () => {
  describe('missing values', () => {
    let errors;

    beforeAll(() => {
      errors = validationDefault({});
    });

    it('should return error for missing fileType', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'fileType')).toBeTruthy();
    });

    it('should return error for missing file', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'file')).toBeTruthy();
    });

    it('should return error for missing analysisType', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'analysisType')).toBeTruthy();
    });

    it('should return error for missing abundance', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'abundance')).toBeTruthy();
    });

    it('should return error for missing condition', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'condition')).toBeTruthy();
    });

    it('should return error for missing readout', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'readout')).toBeTruthy();
    });

    it('should return error for missing score', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'score')).toBeTruthy();
    });

    it('should return error for scoreType', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'scoreType')).toBeTruthy();
    });

    it('should return error for primaryFilter', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'primaryFilter')).toBeTruthy();
    });

    it('should return error for minAbundance', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'minAbundance')).toBeTruthy();
    });
  });

  it('should return an error for invalid file type', () => {
    const errors = validationDefault({ fileType: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'fileType')).toBeTruthy();
  });

  it('should return an error for empty file array', () => {
    const errors = validationDefault({ file: [] });
    expect(Object.prototype.hasOwnProperty.call(errors, 'file')).toBeTruthy();
  });

  it('should return an error for invalid analysis type', () => {
    const errors = validationDefault({ analysisType: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'analysisType')).toBeTruthy();
  });

  it('should return error for invalid score type', () => {
    const errors = validationDefault({ scoreType: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'scoreType')).toBeTruthy();
  });

  it('should return error when primary filter is not a number', () => {
    falsyButNotZero.mockReturnValue(false);
    const errors = validationDefault({ primaryFilter: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'primaryFilter')).toBeTruthy();
  });

  it('should return an error when minimum abundance is not a number', () => {
    falsyButNotZero.mockReturnValue(false);
    const errors = validationDefault({ minAbundance: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'minAbundance')).toBeTruthy();
  });

  describe('control subtraction', () => {
    beforeAll(() => {
      falsyButNotZero.mockReturnValue(true);
    });

    it('should return error when control subtraction is true but no column specified', () => {
      const errors = validationDefault({
        ctrlSub: true,
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'control')).toBeTruthy();
    });

    it('should return no error when control subtraction is true and column specified', () => {
      const errors = validationDefault({
        ctrlSub: true,
        control: 'test',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'control')).toBeFalsy();
    });

    it('should return no error when control subtraction is false and no column specified', () => {
      const errors = validationDefault({
        ctrlSub: false,
        control: 'test',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'control')).toBeFalsy();
    });
  });

  describe('readout length', () => {
    beforeAll(() => {
      falsyButNotZero.mockReturnValue(true);
    });

    it('should return error when readout length normalization is true but no column specified', () => {
      const errors = validationDefault({
        readoutLengthNorm: true,
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'readoutLength')).toBeTruthy();
    });

    it('should return no error when readout length normalization is true and column specified', () => {
      const errors = validationDefault({
        readoutLengthNorm: true,
        readoutLength: 'test',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'readoutLength')).toBeFalsy();
    });

    it('should return no error when readout length normalization is false and no column specified', () => {
      const errors = validationDefault({
        readoutLengthNorm: false,
        readoutLength: 'test',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'readoutLength')).toBeFalsy();
    });
  });

  describe('normalization', () => {
    beforeAll(() => {
      falsyButNotZero.mockReturnValue(true);
    });

    it('should return an error for invalid type', () => {
      const errors = validationDefault({
        normalization: 'test',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'normalization')).toBeTruthy();
    });

    it('should return no error for valid type', () => {
      const errors = validationDefault({
        normalization: 'total',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'normalization')).toBeFalsy();
    });

    it('should return an error for when readout normalization is requested but no column', () => {
      const errors = validationDefault({
        normalization: 'readout',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'normalizationReadout')).toBeTruthy();
    });

    it('should return no error for when readout normalization is requested with column', () => {
      const errors = validationDefault({
        normalization: 'readout',
        normalizationReadout: 'test',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'normalizationReadout')).toBeFalsy();
    });
  });

  it('should return an error for invalid log base', () => {
    falsyButNotZero.mockReturnValue(true);
    const errors = validationDefault({ logBase: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'logBase')).toBeTruthy();
  });

  describe('valid submission', () => {
    let errors;

    beforeAll(() => {
      falsyButNotZero.mockReturnValue(false);
      errors = validationDefault({
        fileType: 'saint',
        file: ['test'],
        analysisType: 'dotplot',
        abundance: 'test',
        condition: 'test',
        readout: 'test',
        score: 'test',
        scoreType: 'lte',
        primaryFilter: 0.01,
        minAbundance: 0,
      });
    });

    it('should return no error for fileType', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'fileType')).toBeFalsy();
    });

    it('should return no error for file', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'file')).toBeFalsy();
    });

    it('should return no error for analysisType', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'analysisType')).toBeFalsy();
    });

    it('should return no error for abundance', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'abundance')).toBeFalsy();
    });

    it('should return no error for condition', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'condition')).toBeFalsy();
    });

    it('should return no error for readout', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'readout')).toBeFalsy();
    });

    it('should return no error for score', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'score')).toBeFalsy();
    });

    it('should return no error for scoreType', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'scoreType')).toBeFalsy();
    });

    it('should return no error for primaryFilter', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'primaryFilter')).toBeFalsy();
    });

    it('should return no error for minAbundance', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'minAbundance')).toBeFalsy();
    });
  });
});
