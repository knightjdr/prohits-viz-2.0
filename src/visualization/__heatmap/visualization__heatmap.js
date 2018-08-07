import React from 'react';

import FloatMap from './float-map/float-map-container';
import SidePanel from '../__side-panel/visualization__side-panel-container';
import Svg from './svg/heatmap-svg-container';

import './visualization__heatmap.css';

const Heatmap = () => (
  <div className="visualization__heatmap">
    <Svg />
    <SidePanel />
    <FloatMap />
  </div>
);

export default Heatmap;
