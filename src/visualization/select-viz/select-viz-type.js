import PropTypes from 'prop-types';
import React from 'react';

import Selection from './selection';

const SelectViz = ({
  handleFile,
  vizType,
}) => {
  let vizElement;
  if (vizType === 'dotplot') {
    vizElement = <div>dotplot</div>;
  } else if (vizType === 'scatter') {
    vizElement = <div>scatter</div>;
  } else {
    vizElement = <Selection handleFile={handleFile} />;
  }
  return vizElement;
};

SelectViz.defaultProps = {
  vizType: null,
};

SelectViz.propTypes = {
  handleFile: PropTypes.func.isRequired,
  vizType: PropTypes.string,
};

export default SelectViz;
