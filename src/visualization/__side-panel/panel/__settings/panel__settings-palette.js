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
  updateSetting,
}) => ([
  <div key="edge-color-label">
    Edge color
  </div>,
  <div key="edge-color-input">
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
      className="panel__settings-button"
      onClick={() => { updateSetting('edgeColor'); }}
      type="button"
    >
      <FontAwesomeIcon icon={faSync} />
    </button>
  </div>,
  <div key="fill-color-label">
    Fill color
  </div>,
  <div key="fill-color-input">
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
      className="panel__settings-button"
      onClick={() => { updateSetting('fillColor'); }}
      type="button"
    >
      <FontAwesomeIcon icon={faSync} />
    </button>
  </div>,
  <div key="invert-color-label">
    Invert color gradient
  </div>,
  <div key="invert-color-input">
    <Switch
      onChange={(value) => { changeSetting('invertColor', value); }}
      checked={settings.invertColor}
    />
    <button
      className="panel__settings-button panel__settings-button_round-borders-all"
      onClick={() => { updateSetting('invertColor'); }}
      type="button"
    >
      <FontAwesomeIcon icon={faSync} />
    </button>
  </div>,
]);

Palette.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  settings: PropTypes.shape({}).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Palette;
