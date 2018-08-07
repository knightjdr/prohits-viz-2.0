import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Switch } from 'antd';

import Image from './panel__map-image';
import Synced from './panel__map-sync';

import './panel__map.css';

const MapContent = ({
  annotations,
  isSyncing,
  markers,
  minimap,
  navigatePosition,
  rangeBox,
  search,
  showAnnotations,
  showMarkers,
  synced,
  syncError,
  syncImage,
  syncMap,
  toggleAnnotations,
  toggleMarkers,
}) => (
  <Fragment>
    <div className="panel__map">
      {
        synced && (minimap || syncImage) ?
          <Image
            annotations={annotations}
            minimap={minimap}
            navigatePosition={navigatePosition}
            rangeBox={rangeBox}
            search={search}
            showAnnotations={showAnnotations}
            showMarkers={showMarkers}
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
      <div>
        Markers:
      </div>
      <Switch
        onChange={toggleMarkers}
        checked={showMarkers}
      />
    </div>
  </Fragment>
);

MapContent.defaultProps = {
  minimap: null,
  showAnnotations: false,
  showMarkers: false,
  syncImage: null,
};

MapContent.propTypes = {
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
  search: PropTypes.shape({
    columns: PropTypes.shape({}),
    match: PropTypes.bool,
    rows: PropTypes.shape({}),
    term: PropTypes.string,
  }).isRequired,
  showAnnotations: PropTypes.bool,
  showMarkers: PropTypes.bool,
  synced: PropTypes.bool.isRequired,
  syncError: PropTypes.bool.isRequired,
  syncImage: PropTypes.string,
  syncMap: PropTypes.func.isRequired,
  toggleAnnotations: PropTypes.func.isRequired,
  toggleMarkers: PropTypes.func.isRequired,
};

export default MapContent;
