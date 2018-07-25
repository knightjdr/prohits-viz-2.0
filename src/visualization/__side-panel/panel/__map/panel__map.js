import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from 'antd';

import Annotations from './panel__map-annotations';

import './panel__map.css';

const Map = ({
  annotations,
  dimensions,
  markers,
  minimap,
  navigatePosition,
  position,
  showAnnotations,
  toggleAnnotations,
}) => {
  const overlay = showAnnotations ?
    (
      <Annotations
        annotations={annotations}
        markers={markers}
      />
    )
    :
    (
      <button
        className="panel__map-select"
        onClick={navigatePosition}
        type="button"
      >
        <div
          className="panel__map-position"
          style={{
            height: `${dimensions.height * 100}%`,
            left: `${position.x * 100}%`,
            top: `${position.y * 100}%`,
            width: `${dimensions.width * 100}%`,
          }}
        />
      </button>
    );
  return (
    <div className="panel">
      <div className="panel__title">
        Mini map
      </div>
      <div className="panel__map">
        <div className="panel__map-inner">
          <img
            alt="Mini map"
            src={minimap}
          />
          {overlay}
        </div>
      </div>
      <div className="panel__map-switch">
        <div>
          Annotations:
        </div>
        <Switch
          onChange={toggleAnnotations}
          checked={showAnnotations}
        />
      </div>
    </div>
  );
};

Map.defaultProps = {
  minimap: null,
  showAnnotations: false,
};

Map.propTypes = {
  annotations: PropTypes.shape({}).isRequired,
  dimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  markers: PropTypes.shape({}).isRequired,
  minimap: PropTypes.string,
  navigatePosition: PropTypes.func.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  showAnnotations: PropTypes.bool,
  toggleAnnotations: PropTypes.func.isRequired,
};

export default Map;
