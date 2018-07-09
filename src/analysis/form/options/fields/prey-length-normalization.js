import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import DefaultCheckboxChange from '../../field/default-checkbox-change';
import Info from '../info/info';

import './prey-length-normalization.css';

const PreyLengthNormalization = ({
  analysisType,
  options,
}) => (
  <div className="PreyLengthNormalization-container">
    <div className="PreyLengthNormalization-checkbox">
      <div className="PreyLengthNormalization-checkbox-label">
        Normalize to prey length:
      </div>
      <CustomField
        name="preyLengthNorm"
        onChange={DefaultCheckboxChange}
        type="switch"
      />
    </div>
    <div className="PreyLengthNormalization-select">
      <CustomField
        helpMessage={Info[analysisType].preyLength}
        label="Prey length column"
        name="preyLength"
        onChange={DefaultChange}
        options={options}
        placeHolder="Prey length column..."
        type="select"
      />
    </div>
  </div>
);

PreyLengthNormalization.defaultProps = {
  options: [],
};

PreyLengthNormalization.propTypes = {
  analysisType: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

export default PreyLengthNormalization;
