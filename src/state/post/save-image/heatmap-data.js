/* Get dotplot/heatmap data, either from main or customize view
** depending on which tab is active. */
const heatmapData = (state) => {
  const {
    annotations,
    markers,
    parameters,
    settings,
    tabs,
  } = state();
  const activeTab = tabs.selected;
  const {
    abundanceCap,
    edgeColor,
    fillColor,
    imageType,
    invertColor,
    minAbundance,
    primaryFilter,
    secondaryFilter,
  } = settings.current;
  const { scoreType, xLabel, yLabel } = parameters;
  const data = {
    abundanceCap,
    annotations,
    edgeColor,
    fillColor,
    imageType,
    invertColor,
    markers,
    minAbundance,
    primaryFilter,
    scoreType,
    secondaryFilter,
    xLabel,
    yLabel,
  };
  if (activeTab === 'customize') {
    const { customize } = state();
    data.columns = customize[customize.length - 1].columns.names;
    data.rows = customize[customize.length - 1].rows.list;
  } else {
    const { columns, rows } = state();
    data.columns = columns.names;
    data.rows = rows.list;
  }
  return data;
};

export default heatmapData;
