import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

const FillColor = ({
  analysisType,
}) => (
  <CustomField
    helpMessage={Info[analysisType].colorScale}
    label="Fill color scale"
    name="fillColor"
    onChange={DefaultChange}
    options={[
      { text: 'Blue to black', value: 'blueBlack' },
      { text: 'Green to black', value: 'greenBlack' },
      { text: 'Greyscale', value: 'greyscale' },
      { text: 'Red to black', value: 'redBlack' },
      { text: 'Yellow to black', value: 'yellowBlack' },
    ]}
    placeHolder="Fill color scale..."
    type="select"
  />
);

FillColor.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default FillColor;
