import PropTypes from 'prop-types';
import React from 'react';

import Heatmap from '../__heatmap/visualization__heatmap';
import Pie from '../__pie/visualization__pie';
import Scatter from '../__scatter/visualization__scatter-container';
import Selection from './visualization__select';

const SelectType = ({
  err,
  handleFile,
  loading,
  vizType,
}) => {
  let vizElement;
  if (vizType === 'heatmap') {
    vizElement = <Heatmap />;
  } else if (vizType === 'dotplot') {
    vizElement = <Heatmap />;
  } else if (vizType === 'pie') {
    vizElement = <Pie />;
  } else if (vizType === 'scatter') {
    vizElement = <Scatter />;
  } else {
    vizElement = (
      <Selection
        err={err}
        handleFile={handleFile}
        loading={loading}
      />
    );
  }
  return vizElement;
};

SelectType.defaultProps = {
  err: null,
  vizType: null,
};

SelectType.propTypes = {
  err: PropTypes.string,
  handleFile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  vizType: PropTypes.string,
};

export default SelectType;
