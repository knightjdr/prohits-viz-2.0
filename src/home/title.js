import React from 'react';

import PipelineLogo from '../assets/title/pipeline.svg';
import './title.css';

const Title = () => (
  <div className="Title-text">
    <img
      alt="Pipeline logo"
      src={PipelineLogo}
    />
    <div className="Title-description">
      A suite of webtools for analyzing and visualizing protein-protein
      interaction data
    </div>
  </div>
);

export default Title;
