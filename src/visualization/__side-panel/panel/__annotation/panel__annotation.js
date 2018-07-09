import PropTypes from 'prop-types';
import React from 'react';

import Annotations from './panel__annotation-annotations';
import Markers from './panel__annotation-markers';

import './panel__annotation.css';

const Annotation = ({
  move,
  record,
}) => (
  <div className="panel">
    <div className="panel__title">
      Markers
    </div>
    <div className="panel__annotation-markers">
      <Markers
        record={record}
      />
    </div>
    <div className="panel__border" />
    <div className="panel__title">
      Annotations
    </div>
    <Annotations
      move={move}
    />
  </div>
);

Annotation.propTypes = {
  move: PropTypes.bool.isRequired,
  record: PropTypes.bool.isRequired,
};

export default Annotation;
