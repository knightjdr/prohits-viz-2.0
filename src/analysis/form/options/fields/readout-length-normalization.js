import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import DefaultCheckboxChange from '../../field/default-checkbox-change';
import Info from '../info/info';

import './option-fields.css';

const ReadoutLengthNormalization = ({
  analysisType,
  options,
}) => (
  <div className="form__option-cs">
    <div className="form__option-cs-checkbox">
      <div className="form__option-cs-checkbox-label">
        Normalize to readout length:
      </div>
      <CustomField
        name="readoutLengthNorm"
        onChange={DefaultCheckboxChange}
        type="switch"
      />
    </div>
    <div className="form__option-cs-select">
      <CustomField
        helpMessage={Info[analysisType].readoutLength}
        label="Readout length column"
        name="readoutLength"
        onChange={DefaultChange}
        options={options}
        placeHolder="Readout length column..."
        type="select"
      />
    </div>
  </div>
);

ReadoutLengthNormalization.defaultProps = {
  options: [],
};

ReadoutLengthNormalization.propTypes = {
  analysisType: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

export default ReadoutLengthNormalization;
