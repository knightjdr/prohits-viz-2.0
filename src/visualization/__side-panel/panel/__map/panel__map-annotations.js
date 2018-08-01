import PropTypes from 'prop-types';
import React from 'react';
import ShortID from 'shortid';

import './panel__map.css';

const Annotations = ({
  annotations,
}) => (
  <div className="panel__map-annotations">
    {annotations.list.map(annotation => (
      <div
        className="panel__map-annotation"
        tooltip={annotation.text}
        key={ShortID.generate()}
        style={{
          backgroundColor: annotations.color,
          left: `calc(${annotation.x * 100}% - 5px)`,
          top: `calc(${annotation.y * 100}% - 5px)`,
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
};

export default Annotations;
