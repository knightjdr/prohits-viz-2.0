import PropTypes from 'prop-types';
import React from 'react';

import './tool-box.css';

const ToolBox = ({
  image,
  text,
  title,
}) => {
  const imageElement = typeof image === 'object' ?
    image
    :
    (
      <img
        alt="Toolbox"
        src={image}
      />
    );
  return (
    <div className="ToolBox-container boxshadow">
      <div className="ToolBox-image">
        { imageElement }
      </div>
      <div className="ToolBox-text">
        { text }
      </div>
      <div className="ToolBox-title">
        { title }
      </div>
    </div>
  );
};

ToolBox.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ToolBox;
