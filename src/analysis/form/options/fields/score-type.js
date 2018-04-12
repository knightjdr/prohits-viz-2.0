import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

const ScoreType = ({
  analysisType,
}) => (
  <CustomField
    helpMessage={Info[analysisType].scoreType}
    label="Score type"
    name="scoreType"
    onChange={DefaultChange}
    options={[
      { text: 'larger scores are better', value: 'gte' },
      { text: 'smaller scores are better', value: 'lte' },
    ]}
    placeHolder="Score type..."
    type="select"
  />
);

ScoreType.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default ScoreType;
