import React from 'react';

import TestMap from '../../../test/map';

import './panel__map.css';

const Map = () => (
  <div className="panel">
    <div className="panel__title">
      Mini map
    </div>
    <div className="panel__map">
      <div className="panel__map-inner">
        <img
          alt="Mini map"
          src={TestMap}
        />
        <div className="panel__map-select" />
      </div>
    </div>
  </div>
);
export default Map;
