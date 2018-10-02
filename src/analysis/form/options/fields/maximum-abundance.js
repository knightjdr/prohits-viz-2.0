import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

const MaximumAbundance = ({
  analysisType,
}) => (
  <CustomField
    helpMessage={Info[analysisType].abundanceCap}
    inputType="number"
    label="Maximum abundance"
    name="abundanceCap"
    onChange={DefaultChange}
    placeHolder="Maximum abundance..."
    type="input"
  />
);

MaximumAbundance.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default MaximumAbundance;
