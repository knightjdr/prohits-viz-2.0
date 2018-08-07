import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/pro-solid-svg-icons';
import { faComment, faSquare } from '@fortawesome/pro-regular-svg-icons';

import './heatmap-svg__status.css';

const Status = ({
  elPosition,
  fixLeft,
  show,
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
      tooltip="Toggle selection box"
      tooltip-position="right"
      type="button"
    >
      <FontAwesomeIcon icon={faSquare} />
    </button>
    <button
      className="heatmap-svg__status-button"
      tooltip="Toggle tooltips"
      tooltip-position="right"
      type="button"
    >
      <FontAwesomeIcon icon={faComment} />
    </button>
  </div>
);

Status.propTypes = {
  elPosition: PropTypes.shape({
    bottom: PropTypes.number,
    right: PropTypes.number,
    transform: PropTypes.string,
  }).isRequired,
  fixLeft: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired,
};

export default Status;
