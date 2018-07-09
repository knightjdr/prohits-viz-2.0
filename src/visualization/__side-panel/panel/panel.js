import React from 'react';

import Analysis from './__analysis/panel__analysis-container';
import Annotation from './__annotation/panel__annotation-container';
import Info from './__info/panel__info-container';
import Map from './__map/panel__map';
import Save from './__save/panel__save-container';
import Settings from './__settings/panel__settings-container';

const Panel = {
  analysis: <Analysis />,
  annotation: <Annotation />,
  info: <Info />,
  map: <Map />,
  save: <Save />,
  settings: <Settings />,
};
export default Panel;