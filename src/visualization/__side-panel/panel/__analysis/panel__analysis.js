import React from 'react';

import AnalysisOptions from './analysis-options/analysis-options-container';
import Selection from './selection/selection-container';

const Analysis = () => (
  <div className="panel">
    <Selection />
    <div className="panel__border" />
    <AnalysisOptions />
  </div>
);

export default Analysis;
