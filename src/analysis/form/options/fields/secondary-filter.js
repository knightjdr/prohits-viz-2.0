import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

const SecondaryFilter = ({
  analysisType,
}) => (
  <CustomField
    helpMessage={Info[analysisType].secondaryFilter}
    inputType="number"
    label="Secondary filter"
    name="secondaryFilter"
    onChange={DefaultChange}
    placeHolder="Secondary filter..."
    type="input"
  />
);

SecondaryFilter.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default SecondaryFilter;
