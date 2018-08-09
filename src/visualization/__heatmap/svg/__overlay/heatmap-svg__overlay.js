import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import ShortID from 'shortid';

const Overlay = ({
  annotations,
  cursor,
  fontSize,
  handleAnimationMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleOverlayMouseDown,
  height,
  marker,
  markerColor,
  markers,
  setRef,
  showAnnotations,
  showMarkers,
  width,
}) => (
  <Fragment>
    <defs>
      <clipPath id="overlayClip">
        <rect height={height + 2} x="-1" y="-1" width={width + 2} />
      </clipPath>
    </defs>
    <g
      clipPath="url(#overlayClip)"
      ref={setRef}
      transform="translate(100 100)"
    >
      <rect
        cursor={cursor}
        fill="black"
        height={height}
        onMouseDown={handleOverlayMouseDown}
        onMouseMove={(e) => { handleMouseMove(e); }}
        onMouseUp={handleMouseUp}
        opacity="0"
        x="0"
        y="0"
        width={width}
      />
      {
        showMarkers &&
        markers.map(markerBox => (
          <rect
            fill="none"
            height={markerBox.height}
            key={ShortID.generate()}
            stroke={markerColor}
            strokeWidth="1"
            x={markerBox.x}
            y={markerBox.y}
            width={markerBox.width}
          />
        ))
      }
      {
        showAnnotations &&
        annotations.map((annotation, index) => (
          <text
            cursor="pointer"
            fontSize={fontSize}
            key={ShortID.generate()}
            onMouseDown={() => { handleAnimationMouseDown(index); }}
            onMouseMove={(e) => { handleMouseMove(e); }}
            onMouseUp={handleMouseUp}
            textAnchor="middle"
            x={annotation.x}
            y={annotation.y}
          >
            {annotation.text}
          </text>
        ))
      }
      {
        marker.show &&
        <rect
          cursor="crosshair"
          fill="black"
          fillOpacity="0.4"
          height={marker.height}
          onMouseMove={(e) => { handleMouseMove(e); }}
          onMouseUp={handleMouseUp}
          stroke="#000"
          strokeOpacity="0.8"
          strokeWidth="1"
          x={marker.x}
          y={marker.y}
          width={marker.width}
        />
      }
    </g>
  </Fragment>
);

Overlay.defaultProps = {
  markerColor: '#000',
  showAnnotations: true,
  showMarkers: true,
};

Overlay.propTypes = {
  annotations: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ).isRequired,
  cursor: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  handleAnimationMouseDown: PropTypes.func.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
  handleOverlayMouseDown: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  marker: PropTypes.shape({
    height: PropTypes.number,
    show: PropTypes.bool,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  markerColor: PropTypes.string,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ).isRequired,
  setRef: PropTypes.shape({}).isRequired,
  showAnnotations: PropTypes.bool,
  showMarkers: PropTypes.bool,
  width: PropTypes.number.isRequired,
};

export default Overlay;
