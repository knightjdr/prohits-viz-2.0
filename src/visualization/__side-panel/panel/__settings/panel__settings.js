import PropTypes from 'prop-types';
import React from 'react';

import Heatmap from './heatmap/panel__settings-heatmap';
import SegCircle from './segcircle/panel__settings-segcircle';

import './panel__settings.css';

const Settings = ({
  changeSetting,
  imageKind,
  settings,
  resetSettings,
  storeSettings,
  updateSetting,
}) => {
  switch (imageKind) {
    case 'segcircle':
      return (
        <SegCircle
          changeSetting={changeSetting}
          settings={settings}
          resetSettings={resetSettings}
          storeSettings={storeSettings}
          updateSetting={updateSetting}
        />
      );
    default:
      return (
        <Heatmap
          changeSetting={changeSetting}
          settings={settings}
          resetSettings={resetSettings}
          storeSettings={storeSettings}
          updateSetting={updateSetting}
        />
      );
  }
};

Settings.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  imageKind: PropTypes.string.isRequired,
  resetSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({}).isRequired,
  storeSettings: PropTypes.shape({}).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Settings;
