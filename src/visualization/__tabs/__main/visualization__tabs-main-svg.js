import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Arrows from '../../__heatmap/svg/__arrows/heatmap-svg__arrows-container';
import Columns from '../../__heatmap/svg/__columns/heatmap-svg__columns-container';
import ContextColumns from './context-menu/context-menu-columns';
import ContextRows from './context-menu/context-menu-rows';
import Overlay from '../../__heatmap/svg/__overlay/heatmap-svg__overlay-container';
import Plot from '../../__heatmap/svg/plot/heatmap-svg__plot-container';
import Rows from '../../__heatmap/svg/__rows/heatmap-svg__rows-container';
import StatusBar from '../../__heatmap/svg/__status/heatmap-svg__status-container';
import MainConnected from './visualization__tabs-main-connected';
import Tooltip from '../../__heatmap/svg/__tooltip/svg__tooltip';

import './visualization__tabs-main.css';

const MainSvg = ({
  closeContextMenu,
  contextTarget,
  contextEvent,
  fixLeft,
  handleClick,
  height,
  openContextMenu,
  plotTranslate,
  reference,
  setContainerRef,
  setSelections,
  setReference,
  show,
  showContext,
  sortRows,
  tooltip,
  toggleTooltip,
  translateLeft,
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
      <MainConnected
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
                rows={connectedProps.rows}
                scoreType={connectedProps.scoreType}
                secondaryFilter={connectedProps.settings.secondaryFilter}
                sortID={connectedProps.sortInfo.id}
              />
              <Overlay
                addMarkerBox={connectedProps.addMarkerBox}
                annotations={connectedProps.annotations}
                cellSize={connectedProps.settings.cellSize}
                columns={connectedProps.columns}
                dimensions={connectedProps.dimensions}
                markerBox={connectedProps.markerBox}
                markers={connectedProps.markers}
                position={connectedProps.position}
                rows={connectedProps.rowNames}
                setSelectedGenes={connectedProps.setSelectedGenes}
                updateAnnotation={connectedProps.updateAnnotation}
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
              />
              <Rows
                cellSize={connectedProps.settings.cellSize}
                handleClick={handleClick}
                openContextMenu={(e, target) => { openContextMenu(e, target, 'row'); }}
                pageHeight={connectedProps.dimensions.pageY}
                position={connectedProps.position.y}
                rows={connectedProps.rowNames}
                search={connectedProps.search}
                sortID={connectedProps.sortInfo.id}
                toggleTooltip={toggleTooltip}
              />
            </svg>
            <StatusBar
              canTranslate={width.canTranslate}
              display={connectedProps.display}
              fixLeft={fixLeft}
              name={connectedProps.name}
              reset={connectedProps.reset}
              toggleSelection={connectedProps.toggleSelection}
              toggleTips={connectedProps.toggleTips}
              translate={translateLeft}
              width={width.wrapper}
            />
            <Arrows
              dimensions={connectedProps.dimensions}
              direction="vertical"
              height={height}
              offset={width.arrowsX}
              position={connectedProps.position}
              show={height.arrowsY}
              updateXY={connectedProps.updateXY}
              width={width}
            />
            <Arrows
              dimensions={connectedProps.dimensions}
              direction="horizontal"
              height={height}
              position={connectedProps.position}
              show={width.arrowsX}
              updateXY={connectedProps.updateXY}
              width={width}
            />
            <ContextColumns
              closeMenu={closeContextMenu}
              event={contextEvent}
              reference={reference}
              setReference={setReference}
              setSelections={setSelections}
              show={showContext === 'column'}
              sortRows={sortRows}
              target={contextTarget}
            />
            <ContextRows
              closeMenu={closeContextMenu}
              event={contextEvent}
              setSelections={setSelections}
              show={showContext === 'row'}
              target={contextTarget}
            />
            <Tooltip {...tooltip} />
          </Fragment>
        )}
      />
    }
  </div>
);

MainSvg.defaultProps = {
  contextEvent: null,
  reference: null,
};

MainSvg.propTypes = {
  closeContextMenu: PropTypes.func.isRequired,
  contextEvent: PropTypes.shape({}),
  contextTarget: PropTypes.string.isRequired,
  fixLeft: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  height: PropTypes.shape({
    arrowsY: PropTypes.bool,
    heatmap: PropTypes.number,
    pageY: PropTypes.number,
    wrapper: PropTypes.number,
  }).isRequired,
  openContextMenu: PropTypes.func.isRequired,
  plotTranslate: PropTypes.number.isRequired,
  reference: PropTypes.string,
  setContainerRef: PropTypes.shape({}).isRequired,
  setReference: PropTypes.func.isRequired,
  setSelections: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  showContext: PropTypes.string.isRequired,
  sortRows: PropTypes.func.isRequired,
  tooltip: PropTypes.shape({
    display: PropTypes.bool,
    left: PropTypes.number,
    text: PropTypes.string,
    top: PropTypes.number,
  }).isRequired,
  toggleTooltip: PropTypes.func.isRequired,
  translateLeft: PropTypes.func.isRequired,
  width: PropTypes.shape({
    arrowsX: PropTypes.bool,
    canTranslate: PropTypes.bool,
    heatmap: PropTypes.number,
    pageX: PropTypes.number,
    wrapper: PropTypes.number,
  }).isRequired,
};

export default MainSvg;
