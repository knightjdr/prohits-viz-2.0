import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

import './option-fields.css';

const OtherAbundanceColulmns = ({
  options,
}) => (
  <div>
    <CustomField
      helpMessage={Info['circ-heatmap'].otherAbundance}
      label="Other Abundance columns"
      multiple
      name="otherAbundance"
      onChange={DefaultChange}
      options={options}
      placeHolder="Other Abundance columns..."
      type="select"
    />
  </div>
);

OtherAbundanceColulmns.defaultProps = {
  options: [],
};

OtherAbundanceColulmns.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

export default OtherAbundanceColulmns;
