import PropTypes from 'prop-types';
import React from 'react';

import Basic from './panel__settings-basic';
import Filters from './panel__settings-filter';
import Palette from './panel__settings-palette';
import Reset from './panel__settings-reset';

import './panel__settings.css';

const Settings = ({
  changeSetting,
  settings,
  resetImage,
  resetSettings,
  storeSettings,
  updateSetting,
}) => (
  <div className="panel">
    <div className="panel__title">
      Basic settings
    </div>
    <Basic
      changeSetting={changeSetting}
      settings={settings}
      storeSettings={storeSettings}
      updateSetting={updateSetting}
    />
    <div className="panel__border" />
    <div className="panel__title">
      Colour palette
    </div>
    <Palette
      changeSetting={changeSetting}
      settings={settings}
      storeSettings={storeSettings}
      updateSetting={updateSetting}
    />
    <div className="panel__border" />
    <div className="panel__title">
      Filters
    </div>
    <Filters
      changeSetting={changeSetting}
      settings={settings}
      storeSettings={storeSettings}
      updateSetting={updateSetting}
    />
    <div className="panel__border" />
    <div className="panel__title">
      Reset
    </div>
    <Reset
      resetImage={resetImage}
      resetSettings={resetSettings}
    />
  </div>
);

Settings.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  resetImage: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({}).isRequired,
  storeSettings: PropTypes.shape({}).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Settings;
