import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import {
  faAdjust,
  faArrows,
  faEye,
  faEyeSlash,
  faPaperclip,
} from '@fortawesome/pro-regular-svg-icons';

import RoundButton from '../../../components/round-button/round-button';
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
  imageMax,
  mouseDown,
  mouseEnter,
  mouseLeave,
  opacity,
  opaque,
  right,
  visible,
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
      style={{
        opacity,
        right,
        pointerEvents: mouseDown ? 'none' : 'auto',
        top,
      }}
    >
      <div className="float-map__buttons">
        <div className="float-map__buttons_left">
          <RoundButton
            className="float-map__button-attach"
            icon={faPaperclip}
            onClick={attachMap}
            size="1x"
            tooltip="Attach map"
            tooltip-position="bottom"
          />
          <RoundButton
            icon={visible ? faEyeSlash : faEye}
            onClick={toggleVisibility}
            size="1x"
            theme={visible ? 'transparent' : 'warning'}
            tooltip={visible ? 'Hide minimap' : 'Show minimap'}
            tooltip-position="bottom"
          />
          <RoundButton
            icon={faAdjust}
            onClick={toggleOpacity}
            theme={opaque ? 'transparent' : 'success'}
            tooltip="Toggle opacity"
            tooltip-position="bottom"
          />
        </div>
        <div className="float-map__buttons_right">
          <RoundButton
            className="float-map__button-move"
            icon={faArrows}
            onMouseDown={handleMouseDownMove}
            theme="transparent"
          />
        </div>
      </div>
      <div
        className="float-map__inner"
        ref={ref}
        style={{
          height: visible ? height : 0,
          opacity: visible ? 1 : 0,
          padding: visible ? 5 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          width: visible ? width : 0,
        }}
      >
        <MapWrapper
          imageLimits={imageMax}
          render={renderMap}
        />
      </div>
      {
        visible
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
  imageMax: PropTypes.shape({
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
  visible: PropTypes.bool.isRequired,
  toggleOpacity: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  top: PropTypes.number.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default FloatMap;
