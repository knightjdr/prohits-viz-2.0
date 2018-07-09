import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Select } from 'antd';
import { faSync } from '@fortawesome/pro-regular-svg-icons';

import './panel__settings.css';

const { Option } = Select;

const Basic = ({
  basic,
}) => ([
  <div key="image-type-label">
    Image type
  </div>,
  <div key="image-type-input">
    <Select
      value={basic.type}
    >
      <Option value="dotplot">dot plot</Option>
      <Option value="heatmap">heat map</Option>
    </Select>
    <button
      className="panel__settings-button"
      type="button"
    >
      <FontAwesomeIcon icon={faSync} />
    </button>
  </div>,
]);

Basic.propTypes = {
  basic: PropTypes.shape({}).isRequired,
};

export default Basic;
