import PropTypes from 'prop-types';
import React from 'react';

import Annotations from './panel__map-annotations';

import './panel__map.css';

const Image = ({
  annotations,
  markers,
  minimap,
  navigatePosition,
  rangeBox,
  showAnnotations,
  syncImage,
}) => (
  <div className="panel__map-inner">
    <img
      alt="Mini map"
      src={syncImage || minimap}
    />
    <button
      className="panel__map-select"
      onClick={navigatePosition}
      type="button"
    >
      <div
        className="panel__map-position"
        style={rangeBox}
      />
      {
        showAnnotations &&
        (
          <Annotations
            annotations={annotations}
            markers={markers}
          />
        )
      }
    </button>
  </div>
);

Image.defaultProps = {
  minimap: null,
  showAnnotations: false,
  syncImage: null,
};

Image.propTypes = {
  annotations: PropTypes.shape({}).isRequired,
  markers: PropTypes.shape({}).isRequired,
  minimap: PropTypes.string,
  navigatePosition: PropTypes.func.isRequired,
  rangeBox: PropTypes.shape({
    height: PropTypes.string,
    left: PropTypes.string,
    top: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  showAnnotations: PropTypes.bool,
  syncImage: PropTypes.string,
};

export default Image;
