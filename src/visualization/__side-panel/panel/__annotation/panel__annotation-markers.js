import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from 'antd';
import {
  faEraser,
  faTrashAlt,
} from '@fortawesome/pro-solid-svg-icons';

const Markers = ({
  record,
}) => ([
  <div key="marker-record-label">
    Record selections
  </div>,
  <div key="marker-record-switch">
    <Switch checked={record} />
  </div>,
  <div key="marker-clear-label">
    Clear last
  </div>,
  <div key="marker-clear-button">
    <button
      className="panel__annotation-button_theme-warning"
      type="button"
    >
      <FontAwesomeIcon icon={faEraser} />
    </button>
  </div>,
  <div key="marker-clear-all-label">
    Clear all
  </div>,
  <div key="marker-clear-all-button">
    <button
      className="panel__annotation-button_theme-warning"
      type="button"
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  </div>,
]);

Markers.propTypes = {
  record: PropTypes.bool.isRequired,
};

export default Markers;
