import React from 'react';

import renderDims from '../../__circheatmap/svg/circheatmap-svg-container';
import renderSvg from './main-circheatmap__svg-interface';
import Connection from './main-circheatmap__store-connection';

/* Entry component for rendering main tab svg element. It will
** grab all relevent state from redux and pass down to the
** dimensions component for rendering. */
const Main = () => (
  <Connection
    renderProp={renderDims}
    renderSvg={renderSvg}
  />
);

export default Main;
