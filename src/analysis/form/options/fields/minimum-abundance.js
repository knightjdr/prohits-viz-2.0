import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

const MinimumAbundance = ({
  analysisType,
}) => (
  <CustomField
    helpMessage={Info[analysisType].minimumAbundance}
    inputType="number"
    label="Minimum abundance"
    name="minimumAbundance"
    onChange={DefaultChange}
    placeHolder="Minimum abundance..."
    required
    type="input"
  />
);

MinimumAbundance.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default MinimumAbundance;
