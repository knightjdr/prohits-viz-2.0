import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import { faEraser } from '@fortawesome/pro-solid-svg-icons';

import Button from '../../../components/button/button';

import './annotation.css';

const Annotation = ({
  annotation,
  clearAnnotation,
  handleChange,
  handleClick,
}) => (
  <div className="visualization__annotation">
    <Input
      onChange={handleChange}
      placeholder="Annotation..."
      value={annotation}
    />
    <Button onClick={handleClick}>
      Annotate
    </Button>
    <Button
      onClick={clearAnnotation}
      type="warning"
    >
      <FontAwesomeIcon icon={faEraser} />
    </Button>
  </div>
);

Annotation.defaultProps = {
  annotation: '',
};

Annotation.propTypes = {
  annotation: PropTypes.string,
  clearAnnotation: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Annotation;
