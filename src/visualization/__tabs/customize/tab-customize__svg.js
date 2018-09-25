import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Arrows from '../../__heatmap/svg/__arrows/heatmap-svg__arrows-container';
import Columns from '../../__heatmap/svg/__columns/heatmap-svg__columns-container';
import ContextColumns from './context-menu/context-menu-columns';
import Plot from '../../__heatmap/svg/plot/heatmap-svg__plot-container';
import Rows from '../../__heatmap/svg/__rows/heatmap-svg__rows-container';
import StatusBar from '../../__heatmap/svg/__status/heatmap-svg__status-container';
import Tooltip from '../../__heatmap/svg/__tooltip/svg__tooltip';
import Tooltips from '../../__heatmap/svg/__tooltip/heatmap-svg__tooltips-container';

import '../../__heatmap/svg/heatmap-svg.css';

const Svg = ({
  closeContextMenu,
  contextEvent,
  contextTarget,
  fixLeft,
  handleClick,
  height,
  openContextMenu,
  reference,
  setReference,
  showContext,
  sortRows,
  toggleTooltip,
  tooltip,
  translateLeft,
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
        openContextMenu={(e, target) => { openContextMenu(e, target, 'column'); }}
        pageWidth={dimensions.pageX}
        position={position.x}
        search={search}
        toggleTooltip={toggleTooltip}
        updateID={customizeID}
      />
      <Rows
        cellSize={settings.cellSize}
        handleClick={handleClick}
        openContextMenu={(e, target) => { openContextMenu(e, target, 'row'); }}
        pageHeight={dimensions.pageY}
        position={position.y}
        rows={rowNames}
        search={search}
        sortID={sortInfo.id}
        toggleTooltip={toggleTooltip}
        updateID={customizeID}
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
  reference: null,
};

Svg.propTypes = {
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
  show: PropTypes.bool.isRequired,
  showContext: PropTypes.string.isRequired,
  sortRows: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
  tooltip: PropTypes.shape({
    display: PropTypes.bool,
    left: PropTypes.number,
    text: PropTypes.node,
    top: PropTypes.number,
  }).isRequired,
  translateLeft: PropTypes.func.isRequired,
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
