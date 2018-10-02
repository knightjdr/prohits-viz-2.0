import FalsyButNotZero from '../../../helpers/falsy-but-not-zero';

const ValidationDotplot = (values) => {
  const errors = {};
  // validate score type
  const validScoreTypes = ['gte', 'lte'];
  if (!values.scoreType) {
    errors.scoreType = 'Specify the score type';
  } else if (!validScoreTypes.includes(values.scoreType)) {
    errors.scoreType = 'Invalid score type';
  }
  // validate primary filter
  if (FalsyButNotZero(values.primaryFilter)) {
    errors.primaryFilter = 'Specify the primary filter';
  } else if (typeof values.primaryFilter !== 'number') {
    errors.primaryFilter = 'Primary filter must be a number';
  }
  // validate secondary filter
  if (FalsyButNotZero(values.secondaryFilter)) {
    errors.secondaryFilter = 'Specify the secondary filter';
  } else if (typeof values.secondaryFilter !== 'number') {
    errors.secondaryFilter = 'Secondary filter must be a number';
  } else if (
    values.secondaryFilter &&
    (
      (
        values.scoreType === 'lte' &&
        values.secondaryFilter <= values.primaryFilter
      ) ||
      (
        values.scoreType === 'gte' &&
        values.secondaryFilter >= values.primaryFilter
      )
    )
  ) {
    const entity = values.scoreType === 'gte' ? '≤' : '≥';
    errors.secondaryFilter = `Secondary filter must be ${entity} primary filter`;
  }
  // validate minimum abundance
  if (FalsyButNotZero(values.minAbundance)) {
    errors.minAbundance = 'Specify the minumum abundance';
  } else if (typeof values.minAbundance !== 'number') {
    errors.minAbundance = 'Minumum abundance must be a number';
  }
  // validate maximun abundance
  if (FalsyButNotZero(values.abundanceCap)) {
    errors.abundanceCap = 'Specify the maximum abundance';
  } else if (typeof values.abundanceCap !== 'number') {
    errors.abundanceCap = 'Minumum abundance must be a number';
  }
  // ensure column has been selected when control subtraction is true
  if (
    values.ctrlSub &&
    !values.control
  ) {
    errors.control = 'Select a column for control subtraction';
  }
  // ensure column has been selected when readout length normalization is true
  if (
    values.readoutLengthNorm &&
    !values.readoutLength
  ) {
    errors.readoutLength = 'Select a column for readout length normalization';
  }
  // validate normalization
  const validNorm = ['none', 'total', 'readout'];
  if (
    values.normalization &&
    !validNorm.includes(values.normalization)
  ) {
    errors.normalization = 'Select a valid normalization method';
  } else if (
    values.normalization === 'readout' &&
    !values.normalizationReadout
  ) {
    errors.normalizationReadout = 'Select a readout for readout-based normalization';
  }
  // validate log transformation
  const validLog = ['none', 2, 'e', 10];
  if (
    values.logTransform &&
    !validLog.includes(values.logTransform)
  ) {
    errors.logTransform = 'Select a valid log transformation';
  }
  // validate fill
  const validColors = ['blueBlack', 'greenBlack', 'greyscale', 'redBlack', 'yellowBlack'];
  if (!values.fillColor) {
    errors.fillColor = 'Specify the fill color';
  } else if (!validColors.includes(values.fillColor)) {
    errors.fillColor = 'Select a valid fill color';
  }
  // validate edge
  if (!values.edgeColor) {
    errors.edgeColor = 'Specify the edge color';
  } else if (!validColors.includes(values.edgeColor)) {
    errors.edgeColor = 'Select a valid edge color';
  }
  // validate clustering
  const validClustering = ['biclustering', 'hierarchical', 'none'];
  if (!values.clustering) {
    errors.clustering = 'Specify the clustering type';
  } else if (!validClustering.includes(values.clustering)) {
    errors.clustering = 'Select a valid clustering type';
  }
  if (values.clustering === 'hierarchical') {
    const validDistance = ['binary', 'canberra', 'euclidean', 'jaccard', 'manhattan', 'maximum'];
    if (!values.distanceMetric) {
      errors.distanceMetric = 'Specify the distance metric for clustering';
    } else if (!validDistance.includes(values.distanceMetric)) {
      errors.distanceMetric = 'Select a valid distance metric';
    }
    const validClustMethod = ['average', 'centroid', 'complete', 'mcquitty', 'median', 'single', 'wards'];
    if (!values.clusteringMethod) {
      errors.clusteringMethod = 'Specify the clutering method';
    } else if (!validClustMethod.includes(values.clusteringMethod)) {
      errors.clusteringMethod = 'Select a valid clustering method';
    }
  } else if (values.clustering === 'none') {
    if (
      values.conditionClustering === 'conditions' &&
      !values.conditionList
    ) {
      errors.conditionList = 'Specify the conditions to use for the non-clustered analysis';
    }
    if (
      values.readoutClustering === 'readouts' &&
      !values.readoutList
    ) {
      errors.readoutList = 'Specify the readouts to use for the non-clustered analysis';
    }
  }
  // validate output folder
  if (!values.outputFolder) {
    errors.outputFolder = 'Specify the name of the output folder';
  }
  return errors;
};
export default ValidationDotplot;
