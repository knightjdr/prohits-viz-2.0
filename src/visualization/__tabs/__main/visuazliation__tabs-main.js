import React from 'react';

import Svg from './visualization__tabs-main-svg';
import SvgDimensions from '../../__heatmap/svg/heatmap-svg-container';
import SvgConnected from './visualization__tabs-main-connected';

const Main = () => (
  <SvgConnected
    renderProp={connectedProps => (
      <SvgDimensions
        cellSize={connectedProps.settings.cellSize}
        columns={connectedProps.columns}
        display={connectedProps.display}
        panel={connectedProps.panel}
        renderProp={svgProps => (
          <Svg {...svgProps} />
        )}
        rows={connectedProps.rowNames}
        setDims={connectedProps.setDims}
        setRef={connectedProps.setRef}
        setSelectedGenes={connectedProps.setSelectedGenes}
        sort={connectedProps.sort}
        updatePlotXY={connectedProps.updatePlotXY}
      />
    )}
  />
);

export default Main;
