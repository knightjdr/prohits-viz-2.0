import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

const ControlSubtraction = ({
  analysisType,
  headerOptions,
}) => (
  <CustomField
    helpMessage={Info[analysisType].control}
    label="Control column"
    name="control"
    onChange={DefaultChange}
    options={headerOptions}
    placeHolder="Control column..."
    required
    type="select"
  />
);

ControlSubtraction.defaultProps = {
  headerOptions: [],
};

ControlSubtraction.propTypes = {
  analysisType: PropTypes.string.isRequired,
  headerOptions: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

export default ControlSubtraction;
