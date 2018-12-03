import React from 'react';

import FloatMap from './float-map/float-map-container';
import SidePanel from '../__side-panel/visualization__side-panel-container';
import Tabs from '../__tabs/visualization__tabs-container';

import './visualization__heatmap.css';

const Heatmap = () => (
  <div className="visualization__heatmap">
    <Tabs />
    <SidePanel
      tabs={['info', 'map', 'settings', 'annotation', 'analysis', 'save']}
    />
    <FloatMap />
  </div>
);

export default Heatmap;
