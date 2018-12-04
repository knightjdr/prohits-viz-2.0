import React from 'react';

import SidePanel from '../__side-panel/visualization__side-panel-container';
import Tabs from '../__tabs/visualization__tabs-container';

import './visualization__segcircle.css';

const Segcircle = () => (
  <div className="visualization__segcircle">
    <Tabs />
    <SidePanel
      tabs={['info', 'settings']}
    />
  </div>
);

export default Segcircle;
