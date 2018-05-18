import PropTypes from 'prop-types';
import React from 'react';

import Heatmap from '../heatmap/heatmap-container';
import Scatter from '../scatter/scatter-container';
import Selection from './selection';

const SelectViz = ({
  err,
  handleFile,
  vizType,
}) => {
  let vizElement;
  if (vizType === 'heatmap') {
    vizElement = <Heatmap />;
  } else if (vizType === 'scatter') {
    vizElement = <Scatter />;
  } else {
    vizElement = (
      <Selection
        err={err}
        handleFile={handleFile}
      />
    );
  }
  return vizElement;
};

SelectViz.defaultProps = {
  err: null,
  vizType: null,
};

SelectViz.propTypes = {
  err: PropTypes.string,
  handleFile: PropTypes.func.isRequired,
  vizType: PropTypes.string,
};

export default SelectViz;
