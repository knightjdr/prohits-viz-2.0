const Settings = (specifiedImageType, userSettings) => {
  const settings = {};

  // Ensure valid settings or provide defaults.
  const {
    abundanceCap,
    cellSize,
    edgeColor,
    fillColor,
    imageType,
    invertColor,
    minAbundance,
    primaryFilter,
    secondaryFilter,
  } = userSettings.current;
  settings.abundanceCap = abundanceCap && !Number.isNaN(abundanceCap) ?
    abundanceCap
    :
    50;
  settings.cellSize = cellSize && !Number.isInteger(cellSize) && cellSize > 0 ?
    cellSize
    :
    20;
  const acceptedColors = ['blueBlack', 'greenBlack', 'greyscale', 'redBlack', 'yellowBlack'];
  settings.edgeColor = edgeColor && acceptedColors.includes(edgeColor) ?
    edgeColor
    :
    'blueBlack';
  settings.fillColor = fillColor && acceptedColors.includes(fillColor) ?
    fillColor
    :
    'blueBlack';
  const acceptedImageTypes = ['dotplot', 'heatmap'];
  settings.imageType = imageType && acceptedImageTypes.includes(imageType) ?
    imageType
    :
    specifiedImageType;
  settings.invertColor = typeof invertColor === 'boolean' ?
    invertColor
    :
    false;
  settings.minAbundance = minAbundance && !Number.isNaN(minAbundance) ?
    minAbundance
    :
    0;
  settings.primaryFilter = primaryFilter && !Number.isNaN(primaryFilter) ?
    primaryFilter
    :
    0.01;
  settings.secondaryFilter = secondaryFilter && !Number.isNaN(secondaryFilter) ?
    secondaryFilter
    :
    0.05;
  return {
    current: settings,
    default: userSettings.default || settings,
  };
};
export default Settings;
