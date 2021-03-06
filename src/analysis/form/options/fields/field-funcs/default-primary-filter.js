const defaultFilters = {
  saint: {
    avgp: 0.9,
    bfdr: 0.01,
    fca: 0.9,
    fcb: 0.9,
    fdr: 0.01,
    is: 0.9,
    maxp: 0.9,
    saintscore: 0.9,
    sp: 0.9,
    wd: 0.9,
  },
};

const defaultPrimaryFilter = (fileType, scoreColumn) => {
  const scoreColumnLC = scoreColumn.toLowerCase();
  if (
    defaultFilters[fileType] &&
    defaultFilters[fileType][scoreColumnLC]
  ) {
    return defaultFilters[fileType][scoreColumnLC];
  }
  return 0.01; // default score for an unknown column
};
export default defaultPrimaryFilter;
