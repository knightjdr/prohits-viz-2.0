import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from 'antd';

import Image from './panel__map-image';
import Synced from './panel__map-sync';

import './panel__map.css';

const Map = ({
  annotations,
  isSyncing,
  markers,
  minimap,
  navigatePosition,
  rangeBox,
  showAnnotations,
  synced,
  syncError,
  syncImage,
  syncMap,
  toggleAnnotations,
}) => (
  <div className="panel">
    <div className="panel__title">
      Mini map
    </div>
    <div className="panel__map">
      {
        synced && (minimap || syncImage) ?
          <Image
            annotations={annotations}
            minimap={minimap}
            navigatePosition={navigatePosition}
            rangeBox={rangeBox}
            showAnnotations={showAnnotations}
            syncImage={syncImage}
            markers={markers}
          />
          :
          <Synced
            minimap={minimap}
            isSyncing={isSyncing}
            syncError={syncError}
            syncMap={syncMap}
          />
      }
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

Map.defaultProps = {
  minimap: null,
  showAnnotations: false,
  syncImage: null,
};

Map.propTypes = {
  annotations: PropTypes.shape({}).isRequired,
  isSyncing: PropTypes.bool.isRequired,
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
  synced: PropTypes.bool.isRequired,
  syncError: PropTypes.bool.isRequired,
  syncImage: PropTypes.string,
  syncMap: PropTypes.func.isRequired,
  toggleAnnotations: PropTypes.func.isRequired,
};

export default Map;
