import { defaultState } from '../../state/set/visualization/settings-reducer';

const acceptedColors = ['blueBlack', 'greenBlack', 'greyscale', 'redBlack', 'yellowBlack'];
const acceptedImageTypes = ['dotplot', 'heatmap'];

const fillSettings = (userSettings = { current: {} }, paramsImageType) => {
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
    thickness,
  } = userSettings.current;
  settings.abundanceCap = typeof abundanceCap === 'number' ? abundanceCap : defaultState.abundanceCap;
  settings.cellSize = Number.isInteger(cellSize) && cellSize > 0 ?
    cellSize
    : defaultState.cellSize;
  settings.edgeColor = acceptedColors.includes(edgeColor) ? edgeColor : defaultState.edgeColor;
  settings.fillColor = acceptedColors.includes(fillColor) ? fillColor : defaultState.fillColor;
  settings.invertColor = typeof invertColor === 'boolean' ? invertColor : defaultState.invertColor;
  settings.minAbundance = typeof minAbundance === 'number' ? minAbundance : defaultState.minAbundance;
  settings.primaryFilter = typeof primaryFilter === 'number' ? primaryFilter : defaultState.primaryFilter;
  settings.secondaryFilter = typeof secondaryFilter === 'number' ?
    secondaryFilter : defaultState.secondaryFilter;
  settings.thickness = typeof thickness === 'number' ?
    thickness : defaultState.thickness;

  if (acceptedImageTypes.includes(imageType)) {
    settings.imageType = imageType;
  } else if (acceptedImageTypes.includes(paramsImageType)) {
    settings.imageType = paramsImageType;
  } else {
    settings.imageType = defaultState.imageType;
  }

  return {
    current: settings,
  };
};

export default fillSettings;
