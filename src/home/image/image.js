import React from 'react';

import Dotplot from '../../assets/background/dotplot.png';
import Dotplot2x from '../../assets/background/dotplot2x.png';
import Dotplot3x from '../../assets/background/dotplot3x.png';

const Image = () => (
  <div className="home__image">
    <img
      alt="ProHits-viz"
      height={500}
      src={Dotplot}
      srcSet={`
        ${Dotplot} 1x,
        ${Dotplot2x} 2x,
        ${Dotplot3x} 3x
      `}
      width={293}
    />
  </div>
);

export default Image;
