export const values = {
  dotplot: {
    abundanceCap: 50,
    biclusteringApprox: false,
    conditionClustering: 'conditions',
    conditionList: '',
    clustering: 'hierarchical',
    clusteringMethod: 'wards',
    ctrlSub: true,
    distanceMetric: 'canberra',
    edgeColor: 'blueBlack',
    fillColor: 'blueBlack',
    logTransform: 'none',
    minAbundance: 0,
    normalization: 'none',
    outputFolder: 'results',
    readoutClustering: 'readouts',
    readoutLengthNorm: false,
    readoutList: '',
    pdf: false,
    png: false,
    primaryFilter: 0.01,
    secondaryFilter: 0.05,
    writeDistance: false,
    writeHeatmap: false,
  },
};

const InitialValues = analysisType => (
  values[analysisType] || {}
);
export default InitialValues;
