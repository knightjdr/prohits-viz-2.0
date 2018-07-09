import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import ScrollTop from '../helpers/scroll-top';

import './tool-box.css';

export const getImageElement = image => (
  typeof image === 'object' ?
    image
    :
    (
      <img
        alt="Toolbox"
        src={image}
      />
    )
);

const ToolBox = ({
  image,
  route,
  text,
  title,
}) => {
  const imageElement = getImageElement(image);
  return (
    <button
      className="toolbox__button"
      onClick={ScrollTop}
    >
      <NavLink
        to={route}
      >
        <div className="ToolBox-container">
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
