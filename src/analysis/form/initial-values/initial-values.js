export const values = {
  'circ-heatmap': {
    abundanceCap: 50,
    ctrlSub: true,
    fillColor: 'blueBlack',
    logBase: 'none',
    minAbundance: 0,
    normalization: 'none',
    otherAbundance: [],
    png: false,
    primaryFilter: 0.01,
    species: 'Homo sapiens',
    specificity: false,
    tissues: ['HEK 293'],
  },
  dotplot: {
    abundanceCap: 50,
    biclusteringApprox: false,
    conditionClustering: 'conditions',
    conditionList: '',
    clustering: 'hierarchical',
    clusteringMethod: 'ward',
    clusteringOptimize: true,
    ctrlSub: true,
    distance: 'canberra',
    edgeColor: 'blueBlack',
    fillColor: 'blueBlack',
    logBase: 'none',
    minAbundance: 0,
    normalization: 'none',
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
