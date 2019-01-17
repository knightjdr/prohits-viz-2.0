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

    it('should return error for secondaryFilter', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'secondaryFilter')).toBeTruthy();
    });

    it('should return error for abundanceCap', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'abundanceCap')).toBeTruthy();
    });

    it('should return error for fillColor', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'fillColor')).toBeTruthy();
    });

    it('should return error for edgeColor', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'edgeColor')).toBeTruthy();
    });

    it('should return error for clustering', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'clustering')).toBeTruthy();
    });
  });

  describe('valid submission', () => {
    let errors;

    beforeAll(() => {
      falsyButNotZero.mockReturnValue(false);
      errors = validationDotplot({
        secondaryFilter: 0.05,
        abundanceCap: 50,
        fillColor: 'blueBlack',
        edgeColor: 'blueBlack',
        clustering: 'hierarchical',
      });
    });

    it('should return no error for secondaryFilter', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'secondaryFilter')).toBeFalsy();
    });

    it('should return no error for abundanceCap', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'abundanceCap')).toBeFalsy();
    });

    it('should return no error for fillColor', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'fillColor')).toBeFalsy();
    });

    it('should return no error for edgeColor', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'edgeColor')).toBeFalsy();
    });

    it('should return no error for clustering', () => {
      expect(Object.prototype.hasOwnProperty.call(errors, 'clustering')).toBeFalsy();
    });
  });

  describe('secondary filter', () => {
    it('should return error when secondary filter is not a number', () => {
      falsyButNotZero.mockReturnValue(false);
      // invalid type
      const errors = validationDotplot({
        primaryFilter: 'test',
        secondaryFilter: 'test',
        scoreType: 'lte',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'secondaryFilter')).toBeTruthy();
    });

    it('should return error when secondary filter is less than primary', () => {
      // value less than when should be greater
      const errors = validationDotplot({
        primaryFilter: 0.1,
        secondaryFilter: 0.05,
        scoreType: 'lte',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'secondaryFilter')).toBeTruthy();
    });

    it('should return error when secondary filter is greater than primary, but should be less', () => {
      // value less then when should be greater
      const errors = validationDotplot({
        primaryFilter: 0.1,
        secondaryFilter: 0.5,
        scoreType: 'gte',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'secondaryFilter')).toBeTruthy();
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

  it('should return an error for invalid edge color', () => {
    falsyButNotZero.mockReturnValue(true);
    const errors = validationDotplot({ edgeColor: 'test' });
    expect(Object.prototype.hasOwnProperty.call(errors, 'edgeColor')).toBeTruthy();
  });

  describe('hierarchical clustering', () => {
    beforeAll(() => {
      falsyButNotZero.mockReturnValue(true);
    });

    it('should return an error for invalid type', () => {
      const errors = validationDotplot({ clustering: 'test' });
      expect(Object.prototype.hasOwnProperty.call(errors, 'clustering')).toBeTruthy();
    });

    it('should return no error for valid type', () => {
      const errors = validationDotplot({
        clustering: 'hierarchical',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'clustering')).toBeFalsy();
    });

    it('should return an error for missing distance metric', () => {
      const errors = validationDotplot({ clustering: 'hierarchical' });
      expect(Object.prototype.hasOwnProperty.call(errors, 'distance')).toBeTruthy();
    });

    it('should return an error for missing clustering method', () => {
      const errors = validationDotplot({ clustering: 'hierarchical' });
      expect(Object.prototype.hasOwnProperty.call(errors, 'clusteringMethod')).toBeTruthy();
    });

    it('should return an error for invalid distance metric', () => {
      const errors = validationDotplot({
        clustering: 'hierarchical',
        distance: 'test',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'distance')).toBeTruthy();
    });

    it('should return an error for invalid clustering method', () => {
      const errors = validationDotplot({
        clustering: 'hierarchical',
        clusteringMethod: 'test',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'clusteringMethod')).toBeTruthy();
    });

    it('should return no error for valid distance metric', () => {
      const errors = validationDotplot({
        distance: 'canberra',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'distance')).toBeFalsy();
    });

    it('should return no error for valid clustering method', () => {
      const errors = validationDotplot({
        clusteringMethod: 'ward',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'clusteringMethod')).toBeFalsy();
    });
  });

  describe('no clustering', () => {
    beforeAll(() => {
      falsyButNotZero.mockReturnValue(true);
    });

    it('should return an error for missing condition list', () => {
      // missing lists
      const errors = validationDotplot({
        conditionClustering: 'conditions',
        clustering: 'none',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'conditionList')).toBeTruthy();
    });

    it('should return an error for missing readout list', () => {
      // missing lists
      const errors = validationDotplot({
        clustering: 'none',
        readoutClustering: 'readouts',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'readoutList')).toBeTruthy();
    });

    it('should return no error for valid condition list', () => {
      // missing lists
      const errors = validationDotplot({
        conditionClustering: 'conditions',
        conditionList: 'test',
        clustering: 'none',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'conditionList')).toBeFalsy();
    });

    it('should return no error for valid readout list', () => {
      // missing lists
      const errors = validationDotplot({
        clustering: 'none',
        readoutClustering: 'readouts',
        readoutList: 'test',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'readoutList')).toBeFalsy();
    });

    it('should not require a list when clustering all conditions', () => {
      const errors = validationDotplot({
        conditionClustering: 'none',
        clustering: 'none',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'conditionList')).toBeFalsy();
    });

    it('should not require a list when clustering all readouts', () => {
      const errors = validationDotplot({
        clustering: 'none',
        readoutClustering: 'none',
      });
      expect(Object.prototype.hasOwnProperty.call(errors, 'readoutList')).toBeFalsy();
    });
  });
});
