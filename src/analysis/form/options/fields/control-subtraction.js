import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import DefaultCheckboxChange from '../../field/default-checkbox-change';
import Info from '../info/info';

import './control-subtraction.css';

const ControlSubtraction = ({
  analysisType,
  options,
}) => (
  <div className="ControlSubtraction-container">
    <div className="ControlSubtraction-checkbox">
      <div className="ControlSubtraction-checkbox-label">
        Control subtraction:
      </div>
      <CustomField
        name="ctrlSub"
        onChange={DefaultCheckboxChange}
        type="switch"
      />
    </div>
    <div className="ControlSubtraction-select">
      <CustomField
        helpMessage={Info[analysisType].control}
        label="Control column"
        name="control"
        onChange={DefaultChange}
        options={options}
        placeHolder="Control column..."
        type="select"
      />
    </div>
  </div>
);

ControlSubtraction.defaultProps = {
  options: [],
};

ControlSubtraction.propTypes = {
  analysisType: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

export default ControlSubtraction;
