import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  faAngleDoubleUp,
  faArrowUp,
  faArrowToTop,
} from '@fortawesome/pro-solid-svg-icons';

import './heatmap-svg__arrows.css';

const Arrows = ({
  nextRow,
  position,
}) => (
  <div
    className="heatmap-svg__arrows"
    style={{
      bottom: position.bottom,
      right: position.right,
      transform: position.transform,
    }}
  >
    <button
      className="heatmap-svg__arrows-button"
      type="button"
    >
      <FontAwesomeIcon icon={faArrowToTop} />
    </button>
    <button
      className="heatmap-svg__arrows-button"
      type="button"
    >
      <FontAwesomeIcon icon={faAngleDoubleUp} />
    </button>
    <button
      className="heatmap-svg__arrows-button"
      onClick={() => { nextRow(-1); }}
      type="button"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
    <button
      className="heatmap-svg__arrows-button"
      onClick={() => { nextRow(1); }}
      type="button"
    >
      <FontAwesomeIcon icon={faArrowUp} rotation={180} />
    </button>
    <button
      className="heatmap-svg__arrows-button"
      type="button"
    >
      <FontAwesomeIcon icon={faAngleDoubleUp} rotation={180} />
    </button>
    <button
      className="heatmap-svg__arrows-button"
      type="button"
    >
      <FontAwesomeIcon icon={faArrowToTop} rotation={180} />
    </button>
  </div>
);

Arrows.propTypes = {
  nextRow: PropTypes.func.isRequired,
  position: PropTypes.shape({
    bottom: PropTypes.number,
    right: PropTypes.number,
    transform: PropTypes.string,
  }).isRequired,
};

export default Arrows;
