import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faFileDownload,
} from '@fortawesome/pro-solid-svg-icons';
import { faComment, faSquare } from '@fortawesome/pro-regular-svg-icons';

import './heatmap-svg__status.css';

const Status = ({
  elPosition,
  download,
  fixLeft,
  selectionBoxActive,
  show,
  toggleSelectionBox,
  toggleTooltips,
  tooltipsActive,
  translate,
}) => (
  <div
    className="heatmap-svg__status"
    style={{
      right: elPosition.right,
      top: elPosition.top,
      visibility: show ? 'visible' : 'hidden',
    }}
  >
    <button
      className="heatmap-svg__status-button"
      onClick={translate}
      tooltip={fixLeft ? 'Center plot' : 'Fix plot to left'}
      tooltip-position="right"
      type="button"
    >
      {
        fixLeft ?
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
          :
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      }
    </button>
    <button
      className="heatmap-svg__status-button"
      onClick={download}
      tooltip="Export current view"
      tooltip-position="right"
      type="button"
    >
      <FontAwesomeIcon icon={faFileDownload} />
    </button>
    <button
      className="heatmap-svg__status-button"
      onClick={toggleSelectionBox}
      tooltip="Toggle selection box"
      tooltip-position="right"
      type="button"
    >
      <FontAwesomeIcon
        icon={faSquare}
        style={{
          color: selectionBoxActive ? 'inherit' : '#999',
        }}
      />
      {
        !selectionBoxActive &&
        <span className="heatmap-svg__state-slash">/</span>
      }
    </button>
    <button
      className="heatmap-svg__status-button"
      onClick={toggleTooltips}
      tooltip="Toggle tooltips"
      tooltip-position="right"
      type="button"
    >
      <FontAwesomeIcon
        icon={faComment}
        style={{
          color: tooltipsActive ? 'inherit' : '#999',
        }}
      />
      {
        !tooltipsActive &&
        <span className="heatmap-svg__state-slash">/</span>
      }
    </button>
  </div>
);

Status.propTypes = {
  download: PropTypes.func.isRequired,
  elPosition: PropTypes.shape({
    bottom: PropTypes.number,
    right: PropTypes.number,
    transform: PropTypes.string,
  }).isRequired,
  fixLeft: PropTypes.bool.isRequired,
  selectionBoxActive: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  tooltipsActive: PropTypes.bool.isRequired,
  toggleSelectionBox: PropTypes.func.isRequired,
  toggleTooltips: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};

export default Status;
