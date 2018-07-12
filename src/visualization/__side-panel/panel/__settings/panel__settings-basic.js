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
        className="panel__settings-button"
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
        className="panel__settings-button"
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
  updateSetting: PropTypes.func.isRequired,
};

export default Basic;
