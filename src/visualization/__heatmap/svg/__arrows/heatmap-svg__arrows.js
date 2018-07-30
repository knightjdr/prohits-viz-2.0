import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  faAngleDoubleUp,
  faArrowUp,
  faArrowToTop,
} from '@fortawesome/pro-solid-svg-icons';

import './heatmap-svg__arrows.css';

const opacitySettings = {
  false: {
    cursor: 'pointer',
    opacity: 1,
  },
  true: {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
};

const Arrows = ({
  arrowOpacity,
  changePosition,
  elPosition,
  length,
  page,
  show,
}) => (
  <div
    className="heatmap-svg__arrows"
    style={{
      bottom: elPosition.bottom,
      right: elPosition.right,
      transform: elPosition.transform,
      visibility: show ? 'visible' : 'hidden',
    }}
  >
    <button
      className="heatmap-svg__arrows-button"
      onClick={() => { changePosition(-length); }}
      style={opacitySettings[arrowOpacity.up]}
      type="button"
    >
      <FontAwesomeIcon icon={faArrowToTop} />
    </button>
    <button
      className="heatmap-svg__arrows-button"
      onClick={() => { changePosition(-page); }}
      style={opacitySettings[arrowOpacity.up]}
      type="button"
    >
      <FontAwesomeIcon icon={faAngleDoubleUp} />
    </button>
    <button
      className="heatmap-svg__arrows-button_font-small"
      onClick={() => { changePosition(-1); }}
      style={opacitySettings[arrowOpacity.up]}
      type="button"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
    <button
      className="heatmap-svg__arrows-button_font-small"
      onClick={() => { changePosition(1); }}
      style={opacitySettings[arrowOpacity.down]}
      type="button"
    >
      <FontAwesomeIcon icon={faArrowUp} rotation={180} />
    </button>
    <button
      className="heatmap-svg__arrows-button"
      onClick={() => { changePosition(page); }}
      style={opacitySettings[arrowOpacity.down]}
      type="button"
    >
      <FontAwesomeIcon icon={faAngleDoubleUp} rotation={180} />
    </button>
    <button
      className="heatmap-svg__arrows-button"
      onClick={() => { changePosition(length); }}
      style={opacitySettings[arrowOpacity.down]}
      type="button"
    >
      <FontAwesomeIcon icon={faArrowToTop} rotation={180} />
    </button>
  </div>
);

Arrows.propTypes = {
  arrowOpacity: PropTypes.shape({
    down: PropTypes.bool,
    up: PropTypes.bool,
  }).isRequired,
  changePosition: PropTypes.func.isRequired,
  elPosition: PropTypes.shape({
    bottom: PropTypes.number,
    right: PropTypes.number,
    transform: PropTypes.string,
  }).isRequired,
  length: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Arrows;
