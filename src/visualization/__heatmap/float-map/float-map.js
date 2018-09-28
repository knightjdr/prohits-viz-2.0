import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faArrows, faPaperclip } from '@fortawesome/pro-regular-svg-icons';

import MapWrapper from '../../__side-panel/panel/__map/panel__map-container';
import renderMap from '../../__side-panel/panel/__map/panel__map-contents';

import './float-map.css';

const FloatMap = ({
  attached,
  attachMap,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  mouseDown,
  right,
  top,
}) => (
  <div
    className="float-map__backdrop"
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    role="button"
    style={{
      display: attached ? 'none' : 'block',
      pointerEvents: mouseDown ? 'auto' : 'none',
    }}
    tabIndex="0"
  >
    <div
      className="float-map"
      style={{
        right,
        pointerEvents: mouseDown ? 'none' : 'auto',
        top,
      }}
    >
      <div className="float__title">
        <button
          onClick={attachMap}
          tooltip="Attach map"
          tooltip-position="right"
          type="button"
        >
          <FontAwesomeIcon icon={faPaperclip} />
        </button>
        Mini map
        <button
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          type="button"
        >
          <FontAwesomeIcon icon={faArrows} size="lg" />
        </button>
      </div>
      <MapWrapper render={renderMap} />
    </div>
  </div>
);

FloatMap.propTypes = {
  attached: PropTypes.bool.isRequired,
  attachMap: PropTypes.func.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
  mouseDown: PropTypes.bool.isRequired,
  right: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
};

export default FloatMap;
