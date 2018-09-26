import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import ShortID from 'shortid';

const AnnotationOverlay = ({
  annotations,
  cursor,
  dragging,
  fontSize,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  height,
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
      style={{ cursor }}
      transform="translate(100 100)"
    >
      <rect
        cursor={cursor}
        fill="black"
        height={height}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        opacity="0"
        pointerEvents={dragging ? 'auto' : 'none'}
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
            onMouseDown={() => { handleMouseDown(index); }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            textAnchor="middle"
            x={annotation.x}
            y={annotation.y}
          >
            {annotation.text}
          </text>
        ))
      }
    </g>
  </Fragment>
);

AnnotationOverlay.defaultProps = {
  markerColor: '#000',
  showAnnotations: true,
  showMarkers: true,
};

AnnotationOverlay.propTypes = {
  annotations: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ).isRequired,
  cursor: PropTypes.string.isRequired,
  dragging: PropTypes.bool.isRequired,
  fontSize: PropTypes.number.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
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

export default AnnotationOverlay;
