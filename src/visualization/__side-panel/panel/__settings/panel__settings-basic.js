import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  InputNumber,
  Select,
} from 'antd';
import { faSync } from '@fortawesome/pro-regular-svg-icons';

import './panel__settings.css';

const { Option } = Select;

const RoundInput = value => Math.round(value);

const Basic = ({
  changeSetting,
  settings,
  storeSettings,
  updateSetting,
}) => (
  <div className="panel__settings-basic">
    <div>
      Image type
    </div>
    <div>
      <Select
        onChange={(value) => { changeSetting('imageType', value); }}
        value={settings.imageType}
      >
        <Option value="dotplot">dot plot</Option>
        <Option value="heatmap">heat map</Option>
      </Select>
      <button
        className={
          storeSettings.imageType === settings.imageType ?
          'panel__settings-button_theme-sync'
          :
          'panel__settings-button_theme-notsync'
        }
        onClick={() => { updateSetting('imageType'); }}
        type="button"
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
    <div>
      Cell size
    </div>
    <div>
      <InputNumber
        onChange={(value) => { changeSetting('cellSize', value); }}
        min={1}
        parser={RoundInput}
        step={1}
        value={settings.cellSize}
      />
      <button
        className={
          storeSettings.cellSize === settings.cellSize ?
          'panel__settings-button_theme-sync'
          :
          'panel__settings-button_theme-notsync'
        }
        onClick={() => { updateSetting('cellSize'); }}
        type="button"
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
  </div>
);

Basic.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    cellSize: PropTypes.number,
    imageType: PropTypes.string,
  }).isRequired,
  storeSettings: PropTypes.shape({
    cellSize: PropTypes.number,
    imageType: PropTypes.string,
  }).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Basic;
