import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';
import { faPaperclip, faReply } from '@fortawesome/pro-regular-svg-icons';

import MapContents from './panel__map-contents';

import './panel__map.css';

const Map = ({
  annotations,
  isAttached,
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
  toggleMapAttach,
  toggleMarkers,
}) => (
  <div className="panel">
    <div className="panel__title">
      <button
        onClick={toggleMapAttach}
        tooltip={isAttached ? 'Detach map' : 'Attach map'}
        tooltip-position="right"
        type="button"
      >
        <FontAwesomeIcon icon={isAttached ? faReply : faPaperclip} />
      </button>
      Mini map
    </div>
    {
      isAttached ?
        <MapContents
          annotations={annotations}
          isSyncing={isSyncing}
          markers={markers}
          minimap={minimap}
          navigatePosition={navigatePosition}
          rangeBox={rangeBox}
          search={search}
          showAnnotations={showAnnotations}
          showMarkers={showMarkers}
          synced={synced}
          syncError={syncError}
          syncImage={syncImage}
          syncMap={syncMap}
          toggleAnnotations={toggleAnnotations}
          toggleMarkers={toggleMarkers}
        />
        :
        <div className="panel__map-detached">
          <div>Map detached from panel</div>
          <Button
            onClick={toggleMapAttach}
            type="button"
          >
            Reattach
          </Button>
        </div>
    }
  </div>
);

Map.defaultProps = {
  minimap: null,
  showAnnotations: false,
  showMarkers: false,
  syncImage: null,
};

Map.propTypes = {
  annotations: PropTypes.shape({}).isRequired,
  isAttached: PropTypes.bool.isRequired,
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
  toggleMapAttach: PropTypes.func.isRequired,
  toggleMarkers: PropTypes.func.isRequired,
};

export default Map;
