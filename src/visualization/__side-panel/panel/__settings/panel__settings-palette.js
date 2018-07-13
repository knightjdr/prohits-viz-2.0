import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Select,
  Switch,
} from 'antd';
import { faSync } from '@fortawesome/pro-regular-svg-icons';

import './panel__settings.css';

const { Option } = Select;

const Palette = ({
  changeSetting,
  settings,
  storeSettings,
  updateSetting,
}) => (
  <div className="panel__settings-palette">
    <div>
      Edge color
    </div>
    <div>
      <Select
        onChange={(value) => { changeSetting('edgeColor', value); }}
        value={settings.edgeColor}
      >
        <Option value="blueBlack">blue-black</Option>
        <Option value="greenBlack">green-black</Option>
        <Option value="redBlack">red-black</Option>
        <Option value="yellowBlack">yellow-black</Option>
        <Option value="greyscale">greyscale</Option>
      </Select>
      <button
        className={
          storeSettings.edgeColor === settings.edgeColor ?
          'panel__settings-button_theme-sync'
          :
          'panel__settings-button_theme-notsync'
        }
        onClick={() => { updateSetting('edgeColor'); }}
        type="button"
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
    <div>
      Fill color
    </div>
    <div>
      <Select
        onChange={(value) => { changeSetting('fillColor', value); }}
        value={settings.fillColor}
      >
        <Option value="blueBlack">blue-black</Option>
        <Option value="greenBlack">green-black</Option>
        <Option value="redBlack">red-black</Option>
        <Option value="yellowBlack">yellow-black</Option>
        <Option value="greyscale">greyscale</Option>
      </Select>
      <button
        className={
          storeSettings.fillColor === settings.fillColor ?
          'panel__settings-button_theme-sync'
          :
          'panel__settings-button_theme-notsync'
        }
        onClick={() => { updateSetting('fillColor'); }}
        type="button"
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
    <div>
      Invert color gradient
    </div>
    <div>
      <Switch
        onChange={(value) => { changeSetting('invertColor', value); }}
        checked={settings.invertColor}
      />
      <button
        className={
          storeSettings.invertColor === settings.invertColor ?
          'panel__settings-button_theme-sync panel__settings-button-invert'
          :
          'panel__settings-button_theme-notsync panel__settings-button-invert'
        }
        onClick={() => { updateSetting('invertColor'); }}
        type="button"
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
  </div>
);

Palette.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    edgeColor: PropTypes.string,
    fillColor: PropTypes.string,
    invertColor: PropTypes.bool,
  }).isRequired,
  storeSettings: PropTypes.shape({
    edgeColor: PropTypes.string,
    fillColor: PropTypes.string,
    invertColor: PropTypes.bool,
  }).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Palette;
