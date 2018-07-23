import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from 'antd';

import Annotations from './panel__map-annotations';

import './panel__map.css';

const Map = ({
  annotations,
  markers,
  minimap,
  navigatePosition,
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
      />
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
  markers: PropTypes.shape({}).isRequired,
  minimap: PropTypes.string,
  navigatePosition: PropTypes.func.isRequired,
  showAnnotations: PropTypes.bool,
  toggleAnnotations: PropTypes.func.isRequired,
};

export default Map;
