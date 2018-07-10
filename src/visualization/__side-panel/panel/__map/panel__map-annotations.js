import PropTypes from 'prop-types';
import React from 'react';
import ShortID from 'shortid';

import './panel__map.css';

const Annotations = ({
  annotations,
}) => (
  <div className="panel__map-annotations">
    {annotations.map(annotation => (
      <div
        className="panel__map-annotation"
        tooltip={annotation.text}
        key={ShortID.generate()}
        style={{
          height: `${annotation.height * 100}%`,
          left: `${annotation.x * 100}%`,
          top: `${annotation.y * 100}%`,
          width: `${annotation.width * 100}%`,
        }}
        tooltip-position="top"
      />
    ))}
  </div>
);


Annotations.propTypes = {
  annotations: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default Annotations;
