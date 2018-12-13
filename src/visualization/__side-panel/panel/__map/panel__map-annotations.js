import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import nanoid from 'nanoid';

import './panel__map.css';

const Annotations = ({
  annotations,
}) => (
  <Fragment>
    {
      annotations.list.map((annotation) => {
        const key = `mapannotation${nanoid()}`;
        return (
          <div
            className="panel__map-annotation"
            tooltip={annotation.text}
            key={key}
            style={{
              backgroundColor: annotations.color,
              left: `calc(${annotation.x * 100}% - 5px)`,
              top: `calc(${annotation.y * 100}% - 5px)`,
            }}
            tooltip-position="top"
          />
        );
      })
    }
  </Fragment>
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
