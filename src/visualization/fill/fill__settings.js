import { defaultState } from '../../state/set/visualization/settings-reducer';

const acceptedColors = ['blueBlack', 'greenBlack', 'greyscale', 'redBlack', 'yellowBlack'];
const acceptedImageTypes = ['dotplot', 'heatmap'];

const fillSettings = (userSettings = { current: {} }) => {
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
  settings.abundanceCap = typeof abundanceCap === 'number' ? abundanceCap : defaultState.abundanceCap;
  settings.cellSize = Number.isInteger(cellSize) && cellSize > 0 ?
    cellSize
    : defaultState.cellSize;
  settings.edgeColor = acceptedColors.includes(edgeColor) ? edgeColor : defaultState.edgeColor;
  settings.fillColor = acceptedColors.includes(fillColor) ? fillColor : defaultState.fillColor;
  settings.imageType = acceptedImageTypes.includes(imageType) ? imageType : defaultState.imageType;
  settings.invertColor = typeof invertColor === 'boolean' ? invertColor : defaultState.invertColor;
  settings.minAbundance = typeof minAbundance === 'number' ? minAbundance : defaultState.minAbundance;
  settings.primaryFilter = typeof primaryFilter === 'number' ? primaryFilter : defaultState.primaryFilter;
  settings.secondaryFilter = typeof secondaryFilter === 'number' ?
    secondaryFilter : defaultState.secondaryFilter;

  return {
    current: settings,
  };
};

export default fillSettings;
