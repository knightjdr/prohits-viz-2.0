import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Arrows from '../../__heatmap/svg/__arrows/heatmap-svg__arrows-container';
import Columns from '../../__heatmap/svg/__columns/heatmap-svg__columns-container';
import ContextColumns from './context-menu/context-menu-columns';
import Delete from '../../__heatmap/svg/__delete/heatmap-svg__delete-container';
import Plot from '../../__heatmap/svg/plot/heatmap-svg__plot-container';
import Rows from '../../__heatmap/svg/__rows/heatmap-svg__rows-container';
import StatusBar from '../../__heatmap/svg/__status/heatmap-svg__status-container';
import Tooltip from '../../__heatmap/svg/__tooltip/svg__tooltip';
import Tooltips from '../../__heatmap/svg/__tooltip/heatmap-svg__tooltips-container';

import '../../__heatmap/svg/heatmap-svg.css';

const Svg = ({
  closeContextMenu,
  columns,
  contextEvent,
  contextTarget,
  customizeOptions,
  customizeID,
  dimensions,
  display,
  fixLeft,
  handleClick,
  height,
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
  settings,
  showContext,
  sortInfo,
  sortRows,
  toggleTips,
  toggleTooltip,
  tooltip,
  translateLeft,
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
        rows={rows.list}
        scoreType={scoreType}
        secondaryFilter={settings.secondaryFilter}
        sortID={sortInfo.id}
        updateID={customizeID}
      />
      <Tooltips
        cellSize={settings.cellSize}
        dimensions={dimensions}
        plotTranslate={display.plotTranslate}
        position={position}
        rows={rows.list}
        showTooltips={display.tooltips}
        toggleTooltip={toggleTooltip}
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
        updateID={customizeID}
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
        updateID={customizeID}
      />
      <Delete
        cellSize={settings.cellSize}
        dimensions={dimensions}
        position={position}
        show={customizeOptions.deleteRC}
      />
    </svg>
    <StatusBar
      canTranslate={width.canTranslate}
      display={display}
      fixLeft={fixLeft}
      name={name}
      reset={reset}
      showSelectionToggle={false}
      toggleTips={toggleTips}
      translate={translateLeft}
      width={width.wrapper}
    />
    <Arrows
      dimensions={dimensions}
      direction="vertical"
      height={height}
      position={position}
      show={height.arrowsY}
      updateXY={updateXY}
      updateID={customizeID}
      width={width}
    />
    <Arrows
      dimensions={dimensions}
      direction="horizontal"
      height={height}
      position={position}
      show={width.arrowsX}
      updateXY={updateXY}
      updateID={customizeID}
      width={width}
    />
    <ContextColumns
      closeMenu={closeContextMenu}
      event={contextEvent}
      reference={reference}
      setReference={setReference}
      show={showContext === 'column'}
      sortRows={sortRows}
      target={contextTarget}
    />
    <Tooltip {...tooltip} />
  </Fragment>
);

Svg.defaultProps = {
  contextEvent: null,
  customizeID: null,
  name: '',
  reference: null,
  scoreType: 'lte',
};

Svg.propTypes = {
  closeContextMenu: PropTypes.func.isRequired,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
    ref: PropTypes.string,
  }).isRequired,
  contextEvent: PropTypes.shape({}),
  contextTarget: PropTypes.string.isRequired,
  customizeID: PropTypes.number,
  customizeOptions: PropTypes.shape({
    deleteRC: PropTypes.bool,
    reorder: PropTypes.bool,
  }).isRequired,
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
  name: PropTypes.string,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  openContextMenu: PropTypes.func.isRequired,
  reference: PropTypes.string,
  reset: PropTypes.func.isRequired,
  rowNames: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  rows: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.number,
          }),
        ),
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  scoreType: PropTypes.string,
  search: PropTypes.shape({
    columns: PropTypes.shape({}),
    match: PropTypes.bool,
    term: PropTypes.string,
  }).isRequired,
  setReference: PropTypes.func.isRequired,
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
  sortInfo: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  sortRows: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
  tooltip: PropTypes.shape({
    display: PropTypes.bool,
    left: PropTypes.number,
    text: PropTypes.node,
    top: PropTypes.number,
  }).isRequired,
  translateLeft: PropTypes.func.isRequired,
  toggleTips: PropTypes.func.isRequired,
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
