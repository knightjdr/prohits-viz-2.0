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
  if (FalsyButNotZero(values.minimumAbundance)) {
    errors.minimumAbundance = 'Specify the minumum abundance';
  } else if (typeof values.minimumAbundance !== 'number') {
    errors.minimumAbundance = 'Minumum abundance must be a number';
  }
  // validate maximun abundance
  if (FalsyButNotZero(values.maximumAbundance)) {
    errors.maximumAbundance = 'Specify the maximum abundance';
  } else if (typeof values.maximumAbundance !== 'number') {
    errors.maximumAbundance = 'Minumum abundance must be a number';
  }
  // ensure column has been selected when control subtraction is true
  if (
    values.ctrlSub &&
    !values.control
  ) {
    errors.control = 'Select a column for control subtraction';
  }
  // ensure column has been selected when prey length normalization is true
  if (
    values.preyLengthNorm &&
    !values.preyLength
  ) {
    errors.preyLength = 'Select a column for prey length normalization';
  }
  // validate normalization
  const validNorm = ['none', 'total', 'prey'];
  if (
    values.normalization &&
    !validNorm.includes(values.normalization)
  ) {
    errors.normalization = 'Select a valid normalization method';
  } else if (
    values.normalization === 'prey' &&
    !values.normalizationPrey
  ) {
    errors.normalizationPrey = 'Select a prey for prey-based normalization';
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
      values.baitClustering === 'baits' &&
      !values.baitList
    ) {
      errors.baitList = 'Specify the baits to use for the non-clustered analysis';
    }
    if (
      values.preyClustering === 'preys' &&
      !values.preyList
    ) {
      errors.preyList = 'Specify the preys to use for the non-clustered analysis';
    }
  }
  // validate output folder
  if (!values.outputFolder) {
    errors.outputFolder = 'Specify the name of the output folder';
  }
  return errors;
};
export default ValidationDotplot;
