import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import ScrollTop from '../helpers/scroll-top';

import './tool-box.css';

const ToolBox = ({
  image,
  route,
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
    <button
      className="Toolbox-button nobutton"
      onClick={ScrollTop}
    >
      <NavLink
        to={route}
      >
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
      </NavLink>
    </button>
  );
};

ToolBox.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ToolBox;
