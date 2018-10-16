import FalsyButNotZero from '../../../helpers/falsy-but-not-zero';
import ValidationDotplot from './validation-dotplot';

jest.mock('../../../helpers/falsy-but-not-zero');

describe('ValidationDotplot', () => {
  test('Missing values should return errors', () => {
    FalsyButNotZero.mockReturnValue(true);
    const errors = ValidationDotplot({});
    expect(Object.prototype.hasOwnProperty.call(errors, 'scoreType')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'primaryFilter')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'secondaryFilter')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'minAbundance')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'abundanceCap')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'fillColor')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'edgeColor')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'clustering')).toBeTruthy();
  });

  test('Correct values returns no errors', () => {
    FalsyButNotZero.mockReturnValue(false);
    const errors = ValidationDotplot({
      scoreType: 'lte',
      primaryFilter: 0.01,
      secondaryFilter: 0.05,
      minAbundance: 0,
      abundanceCap: 50,
      fillColor: 'blueBlack',
      edgeColor: 'blueBlack',
      clustering: 'hierarchical',
      outputFolder: 'results',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'scoreType')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'primaryFilter')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'secondaryFilter')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'minAbundance')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'abundanceCap')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'fillColor')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'edgeColor')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'clustering')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'outputFolder')).toBeFalsy();
  });

  test('Invalid score type returns an error', () => {
    const errors = ValidationDotplot({ scoreType: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'scoreType')).toBeTruthy();
  });

  test('Primary filter must be a number', () => {
    FalsyButNotZero.mockReturnValue(false);
    const errors = ValidationDotplot({ primaryFilter: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'primaryFilter')).toBeTruthy();
  });

  test('Secondary filter must be a number >= or <= primary filter', () => {
    FalsyButNotZero.mockReturnValue(false);
    // invalid type
    let errors = ValidationDotplot({
      primaryFilter: 'test',
      secondaryFilter: 'test',
      scoreType: 'lte',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'secondaryFilter')).toBeTruthy();
    // value less than when should be greater
    errors = ValidationDotplot({
      primaryFilter: 0.1,
      secondaryFilter: 0.05,
      scoreType: 'lte',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'secondaryFilter')).toBeTruthy();
    // value less then when should be greater
    errors = ValidationDotplot({
      primaryFilter: 0.1,
      secondaryFilter: 0.5,
      scoreType: 'gte',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'secondaryFilter')).toBeTruthy();
  });

  test('Minimum abundance must be a number', () => {
    FalsyButNotZero.mockReturnValue(false);
    const errors = ValidationDotplot({ minAbundance: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'minAbundance')).toBeTruthy();
  });

  test('Maximum abundance must be a number', () => {
    FalsyButNotZero.mockReturnValue(false);
    const errors = ValidationDotplot({ abundanceCap: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'abundanceCap')).toBeTruthy();
  });

  test(`Control column must be selected when control subtraction is true
    but not required otherwise`, () => {
    FalsyButNotZero.mockReturnValue(true);
    // missing control column
    let errors = ValidationDotplot({
      ctrlSub: true,
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'control')).toBeTruthy();
    // valid column
    errors = ValidationDotplot({
      ctrlSub: true,
      control: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'control')).toBeFalsy();
    // control subtraction not required, so don't care about column
    errors = ValidationDotplot({
      ctrlSub: false,
      control: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'control')).toBeFalsy();
  });

  test(`Readout length column must be selected when readout length normalization is true
    but not required otherwise`, () => {
    FalsyButNotZero.mockReturnValue(true);
    // readout length column required
    let errors = ValidationDotplot({
      readoutLengthNorm: true,
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'readoutLength')).toBeTruthy();
    // valid
    errors = ValidationDotplot({
      readoutLengthNorm: true,
      readoutLength: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'readoutLength')).toBeFalsy();
    // not required, so don't care about column
    errors = ValidationDotplot({
      readoutLengthNorm: false,
      readoutLength: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'readoutLength')).toBeFalsy();
  });

  test('Normalization method selected with required fields', () => {
    FalsyButNotZero.mockReturnValue(true);
    // invalid type
    let errors = ValidationDotplot({
      normalization: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'normalization')).toBeTruthy();
    // valid
    errors = ValidationDotplot({
      normalization: 'total',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'normalization')).toBeFalsy();
    // readout normalization required readout column
    errors = ValidationDotplot({
      normalization: 'readout',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'normalizationReadout')).toBeTruthy();
    // valid for readout normaltization
    errors = ValidationDotplot({
      normalization: 'readout',
      normalizationReadout: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'normalizationReadout')).toBeFalsy();
  });

  test('Invalid log returns an error', () => {
    FalsyButNotZero.mockReturnValue(true);
    const errors = ValidationDotplot({ logBase: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'logBase')).toBeTruthy();
  });

  test('Invalid fill color returns an error', () => {
    FalsyButNotZero.mockReturnValue(true);
    const errors = ValidationDotplot({ fillColor: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'fillColor')).toBeTruthy();
  });

  test('Invalid edge color returns an error', () => {
    FalsyButNotZero.mockReturnValue(true);
    const errors = ValidationDotplot({ edgeColor: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'edgeColor')).toBeTruthy();
  });

  test('Invalid hierarchical clustering returns an error', () => {
    FalsyButNotZero.mockReturnValue(true);
    // invalid clustering type
    let errors = ValidationDotplot({ clustering: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'clustering')).toBeTruthy();
    // missing distance metric and clustering method
    errors = ValidationDotplot({ clustering: 'hierarchical' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'distance')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'clusteringMethod')).toBeTruthy();
    // invalid distance metric and clustering method
    errors = ValidationDotplot({
      clustering: 'hierarchical',
      distance: 'test',
      clusteringMethod: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'distance')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'clusteringMethod')).toBeTruthy();
    // valid
    errors = ValidationDotplot({
      clustering: 'hierarchical',
      distance: 'canberra',
      clusteringMethod: 'ward',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'clustering')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'distance')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'clusteringMethod')).toBeFalsy();
  });

  test('No clustering requires condition and/or readout lists', () => {
    FalsyButNotZero.mockReturnValue(true);
    // missing lists
    let errors = ValidationDotplot({
      conditionClustering: 'conditions',
      clustering: 'none',
      readoutClustering: 'readouts',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'conditionList')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'readoutList')).toBeTruthy();
    // valid
    errors = ValidationDotplot({
      conditionClustering: 'conditions',
      conditionList: 'test',
      clustering: 'none',
      readoutClustering: 'readouts',
      readoutList: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'conditionList')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'readoutList')).toBeFalsy();
    // lists not required when clustering all
    errors = ValidationDotplot({
      conditionClustering: 'none',
      clustering: 'none',
      readoutClustering: 'none',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'conditionList')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'readoutList')).toBeFalsy();
  });
});
