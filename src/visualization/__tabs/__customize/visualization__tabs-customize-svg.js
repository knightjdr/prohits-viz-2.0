import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Columns from '../../__heatmap/svg/__columns/heatmap-svg__columns-container';
import Plot from '../../__heatmap/svg/plot/heatmap-svg__plot-container';
import Rows from '../../__heatmap/svg/__rows/heatmap-svg__rows-container';
import CustomizeConnected from './visualization__tabs-customize-connected';

import '../__main/visualization__tabs-main.css';

const CustomizeSvg = ({
  handleClick,
  height,
  openContextMenu,
  plotTranslate,
  setContainerRef,
  show,
  toggleTooltip,
  width,
}) => (
  <div
    className="heatmap-svg__wrapper"
    ref={setContainerRef}
    style={{
      transform: `translate(${plotTranslate}px)`,
    }}
  >
    {
      show &&
      <CustomizeConnected
        renderProp={connectedProps => (
          <Fragment>
            <svg
              id="svg-main"
              height={height.wrapper}
              width={width.wrapper}
              xmlns="http://www.w3.org/2000/svg"
            >
              <Plot
                abundanceCap={connectedProps.settings.abundanceCap}
                cellSize={connectedProps.settings.cellSize}
                dimensions={connectedProps.dimensions}
                edgeColor={connectedProps.settings.edgeColor}
                fillColor={connectedProps.settings.fillColor}
                imageType={connectedProps.settings.imageType}
                invertColor={connectedProps.settings.invertColor}
                minAbundance={connectedProps.settings.minAbundance}
                position={connectedProps.position}
                primaryFilter={connectedProps.settings.primaryFilter}
                rows={connectedProps.rows.list}
                scoreType={connectedProps.scoreType}
                secondaryFilter={connectedProps.settings.secondaryFilter}
                sortID={connectedProps.sortInfo.id}
                updateID={connectedProps.customizeID}
              />
              <Columns
                cellSize={connectedProps.settings.cellSize}
                columns={connectedProps.columns}
                handleClick={handleClick}
                openContextMenu={(e, target) => { openContextMenu(e, target, 'column'); }}
                pageWidth={connectedProps.dimensions.pageX}
                position={connectedProps.position.x}
                search={connectedProps.search}
                toggleTooltip={toggleTooltip}
                updateID={connectedProps.customizeID}
              />
              <Rows
                cellSize={connectedProps.settings.cellSize}
                handleClick={handleClick}
                openContextMenu={(e, target) => { openContextMenu(e, target, 'row'); }}
                pageHeight={connectedProps.dimensions.pageY}
                position={connectedProps.position.x}
                rows={connectedProps.rowNames}
                search={connectedProps.search}
                sortID={connectedProps.sortInfo.id}
                toggleTooltip={toggleTooltip}
                updateID={connectedProps.customizeID}
              />
            </svg>
          </Fragment>
        )}
      />
    }
  </div>
);

CustomizeSvg.propTypes = {
  handleClick: PropTypes.func.isRequired,
  height: PropTypes.shape({
    arrowsY: PropTypes.bool,
    heatmap: PropTypes.number,
    pageY: PropTypes.number,
    wrapper: PropTypes.number,
  }).isRequired,
  openContextMenu: PropTypes.func.isRequired,
  plotTranslate: PropTypes.number.isRequired,
  setContainerRef: PropTypes.shape({}).isRequired,
  show: PropTypes.bool.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
  width: PropTypes.shape({
    arrowsX: PropTypes.bool,
    canTranslate: PropTypes.bool,
    heatmap: PropTypes.number,
    pageX: PropTypes.number,
    wrapper: PropTypes.number,
  }).isRequired,
};

export default CustomizeSvg;
