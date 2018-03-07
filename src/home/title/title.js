import React from 'react';

import TitleImage from '../../assets/title/title.svg';
import './title.css';

const Title = () => (
  <div className="Title-text">
    <img
      alt="ProHits-viz"
      src={TitleImage}
    />
    <div className="Title-description">
      A suite of webtools for analyzing and visualizing protein-protein
      interaction data
    </div>
  </div>
);

export default Title;
