import PropTypes from 'prop-types';
import React from 'react';
import ShortID from 'shortid';

import './panel__map.css';

const Annotations = ({
  annotations,
  markers,
}) => (
  <div className="panel__map-annotations">
    {markers.list.map(marker => (
      <div
        className="panel__map-marker"
        key={ShortID.generate()}
        style={{
          borderColor: markers.color,
          height: `${marker.height * 100}%`,
          left: `${marker.x * 100}%`,
          top: `${marker.y * 100}%`,
          width: `${marker.width * 100}%`,
        }}
      />
    ))}
    {annotations.list.map(annotation => (
      <div
        className="panel__map-annotation"
        tooltip={annotation.text}
        key={ShortID.generate()}
        style={{
          backgroundColor: annotations.color,
          left: `${annotation.x * 100}%`,
          top: `${annotation.y * 100}%`,
        }}
        tooltip-position="top"
      />
    ))}
  </div>
);


Annotations.propTypes = {
  annotations: PropTypes.shape({
    color: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ),
  }).isRequired,
  markers: PropTypes.shape({
    color: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        height: PropTypes.number,
        width: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ),
  }).isRequired,
};

export default Annotations;
