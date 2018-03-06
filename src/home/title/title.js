import PropTypes from 'prop-types';
import React from 'react';

import Pipeline from '../../assets/title/pipeline.svg';
import TitleOnly from '../../assets/title/title.svg';
import './title.css';

const Title = ({
  hidePipeline,
  smallWindow,
  togglePipeline,
}) => {
  const imgSrc = hidePipeline ? TitleOnly : Pipeline;
  const titleElement = smallWindow ?
    (
      <div>
        <img
          alt="Pipeline logo"
          src={imgSrc}
        />
      </div>
    )
    :
    (
      <button
        className="nobutton"
        onClick={togglePipeline}
      >
        <img
          alt="Pipeline logo"
          src={imgSrc}
        />
      </button>
    );
  return (
    <div className="Title-text">
      {titleElement}
      <div className="Title-description">
        A suite of webtools for analyzing and visualizing protein-protein
        interaction data
      </div>
    </div>
  );
};

Title.propTypes = {
  hidePipeline: PropTypes.bool.isRequired,
  smallWindow: PropTypes.bool.isRequired,
  togglePipeline: PropTypes.func.isRequired,
};

export default Title;
