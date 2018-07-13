import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  faExclamationCircle,
  faSync,
} from '@fortawesome/pro-solid-svg-icons';

import Basic from './panel__settings-basic';
import Filters from './panel__settings-filter';
import Palette from './panel__settings-palette';
import Reset from './panel__settings-reset';

import './panel__settings.css';

const Settings = ({
  changeSetting,
  settings,
  resetSettings,
  storeSettings,
  updateSetting,
}) => (
  <div className="panel">
    <div className="panel__settings-warning">
      <FontAwesomeIcon icon={faExclamationCircle} />
      <div className="panel__settings-warning-text">
        A setting change will only take effect after pressing
        the refresh{' '}
        <span className="panel__settings-warning-button">
          <FontAwesomeIcon icon={faSync} />
        </span>{' '}
        button.
      </div>
    </div>
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
      resetSettings={resetSettings}
    />
  </div>
);

Settings.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  settings: PropTypes.shape({}).isRequired,
  resetSettings: PropTypes.func.isRequired,
  storeSettings: PropTypes.shape({}).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Settings;
