export const values = {
  dotplot: {
    biclusteringApprox: false,
    baitClustering: 'baits',
    baitList: '',
    clustering: 'hierarchical',
    clusteringMethod: 'wards',
    ctrlSub: true,
    distanceMetric: 'canberra',
    edgeColor: 'blueBlack',
    fillColor: 'blueBlack',
    logTransform: 'none',
    maximumAbundance: 50,
    minimumAbundance: 0,
    normalization: 'none',
    outputFolder: 'results',
    preyClustering: 'preys',
    preyLengthNorm: false,
    preyList: '',
    primaryFilter: 0.01,
    secondaryFilter: 0.05,
  },
};

const InitialValues = analysisType => (
  values[analysisType] || {}
);
export default InitialValues;
