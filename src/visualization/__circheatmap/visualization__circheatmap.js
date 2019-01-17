import React from 'react';

import SidePanel from '../__side-panel/visualization__side-panel-container';
import Tabs from '../__tabs/visualization__tabs-container';

import './visualization__circheatmap.css';

const CircHeatmap = () => (
  <div className="visualization__circheatmap">
    <Tabs />
    <SidePanel
      tabs={['info', 'settings']}
    />
  </div>
);

export default CircHeatmap;
