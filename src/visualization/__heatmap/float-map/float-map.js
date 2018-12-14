import PropTypes from 'prop-types';
import React from 'react';
import {
  faAdjust,
  faArrows,
  faEye,
  faEyeSlash,
  faPaperclip,
} from '@fortawesome/pro-regular-svg-icons';

import Button from '../../../components/round-button/round-button';
import MapWrapper from '../../__side-panel/panel/__map/panel__map-container';
import renderMap from '../../__side-panel/panel/__map/panel__map-contents';

import './float-map.css';

const FloatMap = ({
  attached,
  attachMap,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  height,
  mouseDown,
  mouseEnter,
  mouseLeave,
  opacity,
  opaque,
  right,
  toggleHeight,
  toggleOpacity,
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
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      style={{
        opacity,
        right,
        pointerEvents: mouseDown ? 'none' : 'auto',
        top,
      }}
    >
      <div className="float-map__buttons">
        <div className="float-map__buttons_left">
          <Button
            className="float-map__button-attach"
            icon={faPaperclip}
            onClick={attachMap}
            size="1x"
            tooltip="Attach map"
            tooltip-position="bottom"
          />
          <Button
            icon={height ? faEyeSlash : faEye}
            onClick={toggleHeight}
            size="1x"
            theme={height ? 'transparent' : 'warning'}
            tooltip={height ? 'Hide minimap' : 'Show minimap'}
            tooltip-position="bottom"
          />
          <Button
            icon={faAdjust}
            onClick={toggleOpacity}
            theme={opaque ? 'transparent' : 'success'}
            tooltip="Toggle opacity"
            tooltip-position="bottom"
          />
        </div>
        <div className="float-map__buttons_right">
          <Button
            className="float-map__button-move"
            icon={faArrows}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            theme="transparent"
          />
        </div>
      </div>
      <div
        className="float-map__inner"
        style={{
          height,
          padding: height ? 5 : 0,
          opacity: height ? 1 : 0,
        }}
      >
        {
          height !== 0
          && <MapWrapper render={renderMap} />
        }
      </div>
    </div>
  </div>
);

FloatMap.propTypes = {
  attached: PropTypes.bool.isRequired,
  attachMap: PropTypes.func.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  mouseDown: PropTypes.bool.isRequired,
  mouseEnter: PropTypes.func.isRequired,
  mouseLeave: PropTypes.func.isRequired,
  opacity: PropTypes.number.isRequired,
  opaque: PropTypes.bool.isRequired,
  right: PropTypes.number.isRequired,
  toggleHeight: PropTypes.func.isRequired,
  toggleOpacity: PropTypes.func.isRequired,
  top: PropTypes.number.isRequired,
};

export default FloatMap;
