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

import './panel__settings.css';

const Settings = ({
  changeSetting,
  settings,
  updateSetting,
}) => (
  <div className="panel">
    <div className="panel__title">
      Basic settings
    </div>
    <div className="panel__settings-basic">
      <Basic
        changeSetting={changeSetting}
        settings={settings}
        updateSetting={updateSetting}
      />
    </div>
    <div className="panel__border" />
    <div className="panel__title">
      Colour palette
    </div>
    <div className="panel__settings-palette">
      <Palette
        changeSetting={changeSetting}
        settings={settings}
        updateSetting={updateSetting}
      />
    </div>
    <div className="panel__border" />
    <div className="panel__title">
      Filters
    </div>
    <div className="panel__settings-filter">
      <Filters
        changeSetting={changeSetting}
        settings={settings}
        updateSetting={updateSetting}
      />
    </div>
    <div className="panel__settings-warning">
      <FontAwesomeIcon icon={faExclamationCircle} />{' '}
      <span>
        Settings will only take effect after pressing
        the refresh{' '}
        <span className="panel__settings-warning-button">
          <FontAwesomeIcon icon={faSync} />
        </span>{' '}
        button.
      </span>
    </div>
  </div>
);

Settings.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  settings: PropTypes.shape({}).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Settings;
