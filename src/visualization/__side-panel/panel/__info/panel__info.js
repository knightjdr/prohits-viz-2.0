import React from 'react';

import Settings from './panel__info-settings';

import './panel__info.css';

const Info = () => (
  <div className="panel">
    <div className="panel__title">
      Analysis settings
    </div>
    <div className="panel__info-settings">
      {Settings()}
    </div>
    <div className="panel__title">
      Legend
    </div>
  </div>
);
export default Info;
