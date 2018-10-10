import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

const Log = ({
  analysisType,
}) => (
  <CustomField
    helpMessage={Info[analysisType].log}
    label="Log transformation"
    name="logBase"
    onChange={DefaultChange}
    options={[
      { text: 'none', value: 'none' },
      { text: '2', value: 2 },
      { text: 'e', value: 'e' },
      { text: '10', value: 10 },
    ]}
    placeHolder="Log transformation..."
    type="select"
  />
);

Log.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default Log;
