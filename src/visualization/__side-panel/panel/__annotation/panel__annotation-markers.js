import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { ChromePicker } from 'react-color';
import { Switch } from 'antd';
import {
  faEraser,
  faPalette,
  faTrashAlt,
} from '@fortawesome/pro-solid-svg-icons';

import ClickOutside from '../../../../components/click-outside/click-outside';

const showPicker = {
  false: {
    opacity: 0,
    transform: 'scale(0)',
    visibility: 'hidden',
  },
  true: {
    opacity: 1,
    transform: 'scale(1)',
    visibility: 'visible',
  },
};

const Markers = ({
  clearAllMarkers,
  clearLastMarker,
  closeMarkerColorPicker,
  handleMarkerColor,
  markerColor,
  record,
  showMarkerPicker,
  toggleMarkerColorPicker,
  toggleRecord,
}) => (
  <div className="panel__annotation-markers">
    <div className="panel__annotation-markers-inner">
      <div>
        Record selections
      </div>
      <div>
        <Switch
          checked={record}
          onChange={toggleRecord}
        />
      </div>
      <div>
        Marker color
      </div>
      <div>
        <button
          className="panel__annotation-button_theme-default"
          onClick={toggleMarkerColorPicker}
          type="button"
        >
          <FontAwesomeIcon icon={faPalette} />
        </button>
      </div>
      <div>
        Clear last
      </div>
      <div>
        <button
          className="panel__annotation-button_theme-warning"
          onClick={clearLastMarker}
          type="button"
        >
          <FontAwesomeIcon icon={faEraser} />
        </button>
      </div>
      <div>
        Clear all
      </div>
      <div key="marker-clear-all-button">
        <button
          className="panel__annotation-button_theme-warning"
          onClick={clearAllMarkers}
          type="button"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
    <div
      className="panel__annotation-markers-color-picker"
      style={showPicker[showMarkerPicker]}
    >
      <ClickOutside
        callback={closeMarkerColorPicker}
      >
        <ChromePicker
          color={markerColor}
          disableAlpha
          onChangeComplete={handleMarkerColor}
        />
      </ClickOutside>
    </div>
  </div>
);

Markers.propTypes = {
  clearAllMarkers: PropTypes.func.isRequired,
  clearLastMarker: PropTypes.func.isRequired,
  closeMarkerColorPicker: PropTypes.func.isRequired,
  handleMarkerColor: PropTypes.func.isRequired,
  markerColor: PropTypes.string.isRequired,
  record: PropTypes.bool.isRequired,
  showMarkerPicker: PropTypes.bool.isRequired,
  toggleMarkerColorPicker: PropTypes.func.isRequired,
  toggleRecord: PropTypes.func.isRequired,
};

export default Markers;
