export const testState = {
  addMarkerBox: () => {},
  annotations: {},
  columns: {},
  dimensions: {
    pageX: 10,
    pageY: 10,
  },
  display: {},
  markers: {},
  name: 'name',
  position: {
    x: 0,
    y: 0,
  },
  reset: () => {},
  rowNames: [],
  rows: [],
  scoreType: 'type',
  search: {},
  setSelectedGenes: () => {},
  settings: {
    abundanceCap: 50,
    cellSize: 20,
    edgeColor: 'blueBlack',
    fillColor: 'blueBlack',
    imageType: 'type',
    invertColor: false,
    minAbundance: 0,
    primaryFilter: 0,
    secondaryFilter: 0,
  },
  sortInfo: {},
  toggleSelection: () => {},
  toggleTips: () => {},
  updateAnnotation: () => {},
  updateXY: () => {},
};

const StoreConnection = ({
  renderProp,
}) => renderProp(testState);

export default StoreConnection;
