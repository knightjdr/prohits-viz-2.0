import React from 'react';

import TitleImage from './assets/title.svg';

const Title = () => (
  <h1 className="landing__title">
    ProHits-viz
    <img
      alt="ProHits-viz"
      src={TitleImage}
    />
  </h1>
);

export default Title;
