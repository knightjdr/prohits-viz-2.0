import React from 'react';

import Svg from './visualization__tabs-customize-svg';
import SvgDimensions from '../../__heatmap/svg/heatmap-svg-container';
import SvgConnected from './visualization__tabs-customize-connected';

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
        sort={connectedProps.sort}
        updatePlotXY={connectedProps.updatePlotXY}
        updateID={connectedProps.customizeID}
      />
    )}
  />
);

export default Main;
