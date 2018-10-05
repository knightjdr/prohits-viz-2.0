import PropTypes from 'prop-types';
import React from 'react';

import Heatmap from '../../__heatmap/visualization__heatmap';
import Scatter from '../../__scatter/visualization__scatter-container';

const ImageType = ({
  loading,
  vizType,
}) => {
  let vizElement;
  if (vizType === 'heatmap') {
    vizElement = <Heatmap />;
  } else if (vizType === 'dotplot') {
    vizElement = <Heatmap />;
  } else if (vizType === 'scatter') {
    vizElement = <Scatter />;
  } else {
    vizElement = <div>{ loading }</div>;
  }
  return vizElement;
};

ImageType.defaultProps = {
  err: null,
  vizType: null,
};

ImageType.propTypes = {
  err: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  vizType: PropTypes.string,
};

export default ImageType;
