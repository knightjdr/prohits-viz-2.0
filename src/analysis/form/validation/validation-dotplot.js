import falsyButNotZero from '../../../helpers/falsy-but-not-zero';

const validationDotplot = (values) => {
  const errors = {};

  // validate secondary filter
  if (falsyButNotZero(values.secondaryFilter)) {
    errors.secondaryFilter = 'Specify the secondary filter';
  } else if (Number.isNaN(Number(values.secondaryFilter))) {
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

  // validate maximun abundance
  if (falsyButNotZero(values.abundanceCap)) {
    errors.abundanceCap = 'Specify the maximum abundance';
  } else if (Number.isNaN(Number(values.abundanceCap))) {
    errors.abundanceCap = 'Minumum abundance must be a number';
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
    if (!values.distance) {
      errors.distance = 'Specify the distance metric for clustering';
    } else if (!validDistance.includes(values.distance)) {
      errors.distance = 'Select a valid distance metric';
    }
    const validClustMethod = ['average', 'centroid', 'complete', 'mcquitty', 'median', 'single', 'ward'];
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
  return errors;
};
export default validationDotplot;
