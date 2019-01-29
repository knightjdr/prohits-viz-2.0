import { defaultState } from '../../state/set/visualization/circ-heatmap-settings-reducer';

const acceptedColors = ['blueBlack', 'blueRed', 'blueYellow', 'greenBlack', 'greyscale', 'redBlack', 'yellowBlack'];
const defaultSettings = {
  abundanceCap: 50,
  color: 'blueBlack',
  minAbundance: 0,
  name: 'unknown',
};

const fillCircHeatmapSettings = (userSettings) => {
  if (!Array.isArray(userSettings)) {
    return defaultState;
  }
  return userSettings.map(setting => ({
    abundanceCap: typeof setting.abundanceCap === 'number' ? setting.abundanceCap : defaultSettings.abundanceCap,
    color: acceptedColors.includes(setting.color) ? setting.color : defaultSettings.color,
    minAbundance: typeof setting.minAbundance === 'number' ? setting.minAbundance : defaultSettings.minAbundance,
    name: setting.name || defaultSettings.name,
  }));
};

export default fillCircHeatmapSettings;
