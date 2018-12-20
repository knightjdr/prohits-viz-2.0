import PropTypes from 'prop-types';
import React from 'react';

import Image from './panel__map-image';
import Synced from './panel__map-sync';

import './panel__map.css';

export const MapContent = ({
  annotations,
  imageLimits,
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
}) => (
  <div
    className="panel__map"
    style={{
      height: imageLimits.panelHeight,
    }}
  >
    {
      synced && (minimap || syncImage) ?
        <Image
          annotations={annotations}
          floatMap
          imageLimits={imageLimits}
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
);

MapContent.defaultProps = {
  imageLimits: {
    maxHeight: 'calc(100vh - 165px)',
    maxWidth: 320,
    panelHeight: 'calc(100vh - 165px)',
  },
  minimap: null,
  showAnnotations: false,
  showMarkers: false,
  syncImage: null,
};

MapContent.propTypes = {
  annotations: PropTypes.shape({}).isRequired,
  imageLimits: PropTypes.shape({
    maxHeight: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    maxWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    panelHeight: PropTypes.string,
  }),
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
};

const renderMap = props => <MapContent {...props} />;

export default renderMap;
