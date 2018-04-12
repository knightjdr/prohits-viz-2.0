import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

const EdgeColor = ({
  analysisType,
}) => (
  <CustomField
    helpMessage={Info[analysisType].colorScale}
    label="Edge color scale"
    name="edgeColor"
    onChange={DefaultChange}
    options={[
      { text: 'Blue to black', value: 'blueBlack' },
      { text: 'Green to black', value: 'greenBlack' },
      { text: 'Greyscale', value: 'greyscale' },
      { text: 'Red to black', value: 'redBlack' },
      { text: 'Yellow to black', value: 'yellowBlack' },
    ]}
    placeHolder="Edge color scale..."
    type="select"
  />
);

EdgeColor.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default EdgeColor;
