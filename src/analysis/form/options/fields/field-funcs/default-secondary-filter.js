const defaultFilters = {
  dotplot: {
    avgp: 0.8,
    bfdr: 0.05,
    fca: 0.8,
    fcb: 0.8,
    fdr: 0.05,
    is: 0.8,
    maxp: 0.8,
    saintscore: 0.8,
    sp: 0.8,
    wd: 0.8,
  },
};

const DefaultSecondaryFilter = (analysisType, scoreColumn) => {
  const scoreColumnLC = scoreColumn.toLowerCase();
  if (
    defaultFilters[analysisType] &&
    defaultFilters[analysisType][scoreColumnLC]
  ) {
    return defaultFilters[analysisType][scoreColumnLC];
  }
  return 0.05; // default score for an unknown column
};
export default DefaultSecondaryFilter;
