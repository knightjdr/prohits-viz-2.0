import React from 'react';

import renderDims from '../../__heatmap/svg/heatmap-svg-container';
import renderSvg from './tab-customize__svg-interface';
import Connection from './tab-customize__store-connection';

/* Entry component for rendering main tab svg element. It will
** grab all relevent state from redux and pass down to the
** dimensions component for rendering. */
const Customize = () => (
  <Connection
    renderProp={renderDims}
    renderSvg={renderSvg}
  />
);

export default Customize;

