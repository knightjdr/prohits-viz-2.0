import React from 'react';

import renderDims from '../../__pie/svg/pie-svg-container';
import renderSvg from './main-pie__svg-interface';
import Connection from './main-pie__store-connection';

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
