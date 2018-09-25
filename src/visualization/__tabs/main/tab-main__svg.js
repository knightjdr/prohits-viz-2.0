import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Annotations from '../../__heatmap/svg/__annotations/heatmap-svg__annotation-container';
import Arrows from '../../__heatmap/svg/__arrows/heatmap-svg__arrows-container';
import Columns from '../../__heatmap/svg/__columns/heatmap-svg__columns-container';
import ContextColumns from './context-menu/context-menu-columns';
import ContextRows from './context-menu/context-menu-rows';
import Overlay from '../../__heatmap/svg/__overlay/heatmap-svg__overlay-container';
import Plot from '../../__heatmap/svg/plot/heatmap-svg__plot-container';
import Rows from '../../__heatmap/svg/__rows/heatmap-svg__rows-container';
import StatusBar from '../../__heatmap/svg/__status/heatmap-svg__status-container';
import Tooltip from '../../__heatmap/svg/__tooltip/svg__tooltip';
import Tooltips from '../../__heatmap/svg/__tooltip/heatmap-svg__tooltips-container';

const Svg = ({
  addMarkerBox,
  annotations,
  closeContextMenu,
  columns,
  contextEvent,
  contextTarget,
  dimensions,
  display,
  fixLeft,
  handleClick,
  height,
  markers,
  name,
  openContextMenu,
  position,
  reference,
  reset,
  rowNames,
  rows,
  scoreType,
  search,
  setReference,
  setSelectedGenes,
  setSelections,
  settings,
  showContext,
  sortInfo,
  sortRows,
  toggleSelection,
  toggleTips,
  toggleTooltip,
  tooltip,
  translateLeft,
  updateAnnotation,
  updateXY,
  width,
}) => (
  <Fragment>
    <svg
      id="svg-main"
      height={height.wrapper}
      width={width.wrapper}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Plot
        abundanceCap={settings.abundanceCap}
        cellSize={settings.cellSize}
        dimensions={dimensions}
        edgeColor={settings.edgeColor}
        fillColor={settings.fillColor}
        imageType={settings.imageType}
        invertColor={settings.invertColor}
        minAbundance={settings.minAbundance}
        position={position}
        primaryFilter={settings.primaryFilter}
        rows={rows}
        scoreType={scoreType}
        secondaryFilter={settings.secondaryFilter}
        sortID={sortInfo.id}
      />
      <Overlay
        addMarkerBox={addMarkerBox}
        cellSize={settings.cellSize}
        columns={columns}
        dimensions={dimensions}
        markers={markers}
        position={position}
        rows={rowNames}
        setSelectedGenes={setSelectedGenes}
        showSelectionbox={display.selectionBox}
      />
      <Tooltips
        cellSize={settings.cellSize}
        dimensions={dimensions}
        plotTranslate={display.plotTranslate}
        position={position}
        rows={rows}
        showTooltips={display.tooltips}
        toggleTooltip={toggleTooltip}
      />
      <Annotations
        annotations={annotations}
        cellSize={settings.cellSize}
        dimensions={dimensions}
        markers={markers}
        position={position}
        updateAnnotation={updateAnnotation}
      />
      <Columns
        cellSize={settings.cellSize}
        columns={columns}
        handleClick={handleClick}
        openContextMenu={openContextMenu}
        pageWidth={dimensions.pageX}
        position={position.x}
        search={search}
        toggleTooltip={toggleTooltip}
      />
      <Rows
        cellSize={settings.cellSize}
        handleClick={handleClick}
        openContextMenu={openContextMenu}
        pageHeight={dimensions.pageY}
        position={position.y}
        rows={rowNames}
        search={search}
        sortID={sortInfo.id}
        toggleTooltip={toggleTooltip}
      />
    </svg>
    <StatusBar
      canTranslate={width.canTranslate}
      display={display}
      fixLeft={fixLeft}
      name={name}
      reset={reset}
      toggleSelection={toggleSelection}
      toggleTips={toggleTips}
      translate={translateLeft}
      width={width.wrapper}
    />
    <Arrows
      dimensions={dimensions}
      direction="vertical"
      height={height}
      offset={width.arrowsX}
      position={position}
      show={height.arrowsY}
      updateXY={updateXY}
      width={width}
    />
    <Arrows
      dimensions={dimensions}
      direction="horizontal"
      height={height}
      position={position}
      show={width.arrowsX}
      updateXY={updateXY}
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
);

Svg.defaultProps = {
  contextEvent: null,
  name: '',
  reference: null,
};

Svg.propTypes = {
  addMarkerBox: PropTypes.func.isRequired,
  annotations: PropTypes.shape({
    fontSize: PropTypes.number,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ),
    show: PropTypes.bool,
  }).isRequired,
  closeContextMenu: PropTypes.func.isRequired,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
    ref: PropTypes.string,
  }).isRequired,
  contextEvent: PropTypes.shape({}),
  contextTarget: PropTypes.string.isRequired,
  dimensions: PropTypes.shape({
    columns: PropTypes.number,
    height: PropTypes.number,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    rows: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  display: PropTypes.shape({
    plotFixed: PropTypes.bool,
    plotTranslate: PropTypes.number,
    selectionBox: PropTypes.bool,
    tooltips: PropTypes.bool,
  }).isRequired,
  fixLeft: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  height: PropTypes.shape({
    arrowsY: PropTypes.bool,
    heatmap: PropTypes.number,
    pageY: PropTypes.number,
    wrapper: PropTypes.number,
  }).isRequired,
  markers: PropTypes.shape({
    color: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    show: PropTypes.bool,
  }).isRequired,
  name: PropTypes.string,
  openContextMenu: PropTypes.func.isRequired,
  panel: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  reference: PropTypes.string,
  reset: PropTypes.func.isRequired,
  rowNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.number,
        }),
      ),
      name: PropTypes.string,
    }),
  ).isRequired,
  scoreType: PropTypes.string.isRequired,
  search: PropTypes.shape({
    columns: PropTypes.shape({}),
    match: PropTypes.bool,
    rows: PropTypes.shape({}),
    term: PropTypes.string,
  }).isRequired,
  setRef: PropTypes.func.isRequired,
  setReference: PropTypes.func.isRequired,
  setSelectedGenes: PropTypes.func.isRequired,
  setSelections: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    abundanceCap: PropTypes.number,
    cellSize: PropTypes.number,
    edgeColor: PropTypes.string,
    fillColor: PropTypes.string,
    imageType: PropTypes.string,
    invertColor: PropTypes.bool,
    minAbundance: PropTypes.number,
    primaryFilter: PropTypes.number,
    secondaryFilter: PropTypes.number,
  }).isRequired,
  showContext: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
  sortInfo: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  sortRows: PropTypes.func.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  toggleTips: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
  tooltip: PropTypes.shape({
    display: PropTypes.bool,
    left: PropTypes.number,
    text: PropTypes.node,
    top: PropTypes.number,
  }).isRequired,
  translateLeft: PropTypes.func.isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  updatePlotXY: PropTypes.func.isRequired,
  updateXY: PropTypes.func.isRequired,
  width: PropTypes.shape({
    arrowsX: PropTypes.bool,
    canTranslate: PropTypes.bool,
    heatmap: PropTypes.number,
    pageX: PropTypes.number,
    wrapper: PropTypes.number,
  }).isRequired,
};

const renderSvg = props => <Svg {...props} />;

export default renderSvg;
