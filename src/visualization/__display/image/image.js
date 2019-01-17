import PropTypes from 'prop-types';
import React from 'react';

import Heatmap from '../../__heatmap/visualization__heatmap';
import CircHeatmap from '../../__circheatmap/visualization__circheatmap';
import Scatter from '../../__scatter/visualization__scatter-container';
import Status from './image__status';

import './image.css';

const ImageType = ({
  error,
  loading,
  vizType,
}) => {
  let vizElement;
  if (
    error ||
    loading
  ) {
    vizElement = (
      <Status
        error={error}
        loading={loading}
      />
    );
  } else if (vizType === 'circ-heatmap') {
    vizElement = <CircHeatmap />;
  } else if (vizType === 'scatter') {
    vizElement = <Scatter />;
  } else {
    vizElement = <Heatmap />;
  }
  return vizElement;
};

ImageType.defaultProps = {
  vizType: null,
};

ImageType.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  vizType: PropTypes.string,
};

export default ImageType;
