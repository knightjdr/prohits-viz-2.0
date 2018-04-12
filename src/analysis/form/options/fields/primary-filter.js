import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

const PrimaryFilter = ({
  analysisType,
}) => (
  <CustomField
    helpMessage={Info[analysisType].primaryFilter}
    inputType="number"
    label="Primary filter"
    name="primaryFilter"
    onChange={DefaultChange}
    placeHolder="Primary filter..."
    type="input"
  />
);

PrimaryFilter.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default PrimaryFilter;
