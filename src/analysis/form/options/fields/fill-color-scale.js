import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

const FillColorScale = ({
  analysisType,
}) => (
  <CustomField
    helpMessage={Info[analysisType].colorScale}
    label="Fill color scale"
    name="fillColorScale"
    onChange={DefaultChange}
    options={[
      { text: 'Blue to black', value: 'blueBlack' },
      { text: 'Red to black', value: 'redBlack' },
      { text: 'Yellow to black', value: 'yellowBlack' },
      { text: 'Green to black', value: 'greenBlack' },
      { text: 'Greyscale', value: 'greyscale' },
    ]}
    placeHolder="Fill color scale..."
    type="select"
  />
);

FillColorScale.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default FillColorScale;
