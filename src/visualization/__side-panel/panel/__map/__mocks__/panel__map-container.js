import PropTypes from 'prop-types';
import React from 'react';

const MapContainer = ({
  render,
}) => {
  const props = {
    test: 'value',
  };
  return (
    <div className="map-container">
      { render(props) }
    </div>
  );
};

MapContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default MapContainer;
