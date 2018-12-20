import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
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

const FloatMap = forwardRef(({
  attached,
  attachMap,
  handleMouseDownMove,
  handleMouseDownResize,
  handleMouseMove,
  handleMouseUp,
  height,
  imageLimits,
  mouseDown,
  mouseEnter,
  mouseLeave,
  opacity,
  opaque,
  right,
  scale,
  toggleOpacity,
  toggleVisibility,
  top,
  width,
}, ref) => (
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
      ref={ref}
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
            icon={scale ? faEyeSlash : faEye}
            onClick={toggleVisibility}
            size="1x"
            theme={scale ? 'transparent' : 'warning'}
            tooltip={scale ? 'Hide minimap' : 'Show minimap'}
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
            onMouseDown={handleMouseDownMove}
            theme="transparent"
          />
        </div>
      </div>
      <div
        className="float-map__inner"
        style={{
          height: scale ? height : 0,
          padding: scale ? 5 : 0,
          opacity: scale ? 1 : 0,
          width: scale ? width : 0,
        }}
      >
        <MapWrapper
          imageLimits={imageLimits}
          render={renderMap}
        />
      </div>
      {
        scale !== 0
        && (
          <button
            className="float-map__resize"
            onMouseDown={handleMouseDownResize}
          />
        )
      }
    </div>
  </div>
));

FloatMap.propTypes = {
  attached: PropTypes.bool.isRequired,
  attachMap: PropTypes.func.isRequired,
  handleMouseDownMove: PropTypes.func.isRequired,
  handleMouseDownResize: PropTypes.func.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
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
  }).isRequired,
  mouseDown: PropTypes.bool.isRequired,
  mouseEnter: PropTypes.func.isRequired,
  mouseLeave: PropTypes.func.isRequired,
  opacity: PropTypes.number.isRequired,
  opaque: PropTypes.bool.isRequired,
  right: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  toggleOpacity: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  top: PropTypes.number.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default FloatMap;
