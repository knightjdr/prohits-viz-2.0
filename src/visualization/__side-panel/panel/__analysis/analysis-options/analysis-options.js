import PropTypes from 'prop-types';
import React from 'react';
import { Select } from 'antd';

import './analysis-options.css';

const { Option } = Select;

const AnalysisOptions = ({
  type,
}) => (
  <div className="analysis-options">
    <Select
      className="analysis-options__type-select"
      value={type}
    >
      <Option value="customize">customize image</Option>
      <Option value="domain">domain</Option>
      <Option value="go">GO enrichment</Option>
      <Option value="network">network</Option>
    </Select>
  </div>
);

AnalysisOptions.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AnalysisOptions;
