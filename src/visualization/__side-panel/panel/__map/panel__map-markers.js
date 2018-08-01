import PropTypes from 'prop-types';
import React from 'react';
import ShortID from 'shortid';

import './panel__map.css';

const Markers = ({
  markers,
}) => (
  <div className="panel__map-markers">
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
  </div>
);


Markers.propTypes = {
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

export default Markers;
