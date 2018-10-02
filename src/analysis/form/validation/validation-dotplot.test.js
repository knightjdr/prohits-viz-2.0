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
    expect(Object.prototype.hasOwnProperty.call(errors, 'outputFolder')).toBeTruthy();
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

  test(`Prey length column must be selected when prey length normalization is true
    but not required otherwise`, () => {
    FalsyButNotZero.mockReturnValue(true);
    // prey length column required
    let errors = ValidationDotplot({
      preyLengthNorm: true,
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'preyLength')).toBeTruthy();
    // valid
    errors = ValidationDotplot({
      preyLengthNorm: true,
      preyLength: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'preyLength')).toBeFalsy();
    // not required, so don't care about column
    errors = ValidationDotplot({
      preyLengthNorm: false,
      preyLength: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'preyLength')).toBeFalsy();
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
    // prey normalization required prey column
    errors = ValidationDotplot({
      normalization: 'prey',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'normalizationPrey')).toBeTruthy();
    // valid for prey normaltization
    errors = ValidationDotplot({
      normalization: 'prey',
      normalizationPrey: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'normalizationPrey')).toBeFalsy();
  });

  test('Invalid log returns an error', () => {
    FalsyButNotZero.mockReturnValue(true);
    const errors = ValidationDotplot({ logTransform: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'logTransform')).toBeTruthy();
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
    expect(Object.prototype.hasOwnProperty.call(errors, 'distanceMetric')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'clusteringMethod')).toBeTruthy();
    // invalid distance metric and clustering method
    errors = ValidationDotplot({
      clustering: 'hierarchical',
      distanceMetric: 'test',
      clusteringMethod: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'distanceMetric')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'clusteringMethod')).toBeTruthy();
    // valid
    errors = ValidationDotplot({
      clustering: 'hierarchical',
      distanceMetric: 'canberra',
      clusteringMethod: 'wards',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'clustering')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'distanceMetric')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'clusteringMethod')).toBeFalsy();
  });

  test('No clustering requires bait and/or prey lists', () => {
    FalsyButNotZero.mockReturnValue(true);
    // missing lists
    let errors = ValidationDotplot({
      baitClustering: 'baits',
      clustering: 'none',
      preyClustering: 'preys',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'baitList')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'preyList')).toBeTruthy();
    // valid
    errors = ValidationDotplot({
      baitClustering: 'baits',
      baitList: 'test',
      clustering: 'none',
      preyClustering: 'preys',
      preyList: 'test',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'baitList')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'preyList')).toBeFalsy();
    // lists not required when clustering all
    errors = ValidationDotplot({
      baitClustering: 'none',
      clustering: 'none',
      preyClustering: 'none',
    });
    expect(Object.prototype.hasOwnProperty.call(errors, 'baitList')).toBeFalsy();
    expect(Object.prototype.hasOwnProperty.call(errors, 'preyList')).toBeFalsy();
  });
});
