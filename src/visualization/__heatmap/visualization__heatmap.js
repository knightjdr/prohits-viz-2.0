import React from 'react';

import SidePanel from '../__side-panel/visualization__side-panel-container';
import Svg from './svg/heatmap-svg-container';

import './visualization__heatmap.css';

const Heatmap = () => (
  <div className="visualization__heatmap">
    <Svg />
    <SidePanel />
  </div>
);

export default Heatmap;
