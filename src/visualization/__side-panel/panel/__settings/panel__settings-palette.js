import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Select,
  Switch,
} from 'antd';
import { faArrowAltCircleRight } from '@fortawesome/pro-light-svg-icons';

import './panel__settings.css';

const { Option } = Select;

const Palette = ({
  palette,
}) => ([
  <div key="edge-color-label">
    Edge color
  </div>,
  <div key="edge-color-input">
    <Select
      value={palette.edge}
    >
      <Option value="blueBlack">blue-black</Option>
      <Option value="greenBlack">green-black</Option>
      <Option value="redBlack">red-black</Option>
      <Option value="yellowBlack">yellow-black</Option>
      <Option value="greyscale">greyscale</Option>
    </Select>
    <button
      className="panel__settings-button"
      type="button"
    >
      <FontAwesomeIcon icon={faArrowAltCircleRight} />
    </button>
  </div>,
  <div key="fill-color-label">
    Fill color
  </div>,
  <div key="fill-color-input">
    <Select
      value={palette.fill}
    >
      <Option value="blueBlack">blue-black</Option>
      <Option value="greenBlack">green-black</Option>
      <Option value="redBlack">red-black</Option>
      <Option value="yellowBlack">yellow-black</Option>
      <Option value="greyscale">greyscale</Option>
    </Select>
    <button
      className="panel__settings-button"
      type="button"
    >
      <FontAwesomeIcon icon={faArrowAltCircleRight} />
    </button>
  </div>,
  <div key="invert-color-label">
    Invert color gradient
  </div>,
  <div key="invert-color-input">
    <Switch checked={palette.invert} />
    <button
      className="panel__settings-button panel__settings-button_round-borders-all"
      type="button"
    >
      <FontAwesomeIcon icon={faArrowAltCircleRight} />
    </button>
  </div>,
]);

Palette.propTypes = {
  palette: PropTypes.shape({}).isRequired,
};

export default Palette;
