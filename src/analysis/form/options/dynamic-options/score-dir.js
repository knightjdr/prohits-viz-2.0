import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

const ScoreDir = ({
  analysisType,
}) => (
  <CustomField
    helpMessage={Info[analysisType].scoreDir}
    label="Score direction"
    name="scoreDir"
    onChange={DefaultChange}
    options={[
      { text: 'smaller scores are better', value: 'lte' },
      { text: 'larger scores are better', value: 'gte' },
    ]}
    placeHolder="Score direction..."
    required
    type="select"
  />
);

ScoreDir.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default ScoreDir;
