import React from 'react';

import PipelineLogo from '../assets/title/pipeline.svg';
import './title.css';

const Title = () => (
  <div className="Title-text">
    <img
      alt="Pipeline logo"
      src={PipelineLogo}
    />
  </div>
);

export default Title;
