import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Arrows from './__arrows/heatmap-svg__arrows-container';
import Columns from './__columns/heatmap-svg__columns-container';
import ContextMenuColumns from './context-menu/context-menu';
import Plot from './plot/heatmap-svg__plot-container';
import Rows from './__rows/heatmap-svg__rows-container';
import Tooltip from './__tooltip/svg__tooltip';

import './heatmap-svg.css';

const Svg = ({
  closeContextMenu,
  contextColumnTarget,
  contextEvent,
  height,
  openColumnContextMenu,
  reference,
  setReference,
  show,
  showColumnContext,
  sortRows,
  tooltip,
  toggleTooltip,
  width,
}) => (
  show &&
  <Fragment>
    <svg xmlns="http://www.w3.org/2000/svg" height={height.wrapper} width={width.wrapper}>
      <Plot />
      <Columns
        openContextMenu={openColumnContextMenu}
        sortRows={sortRows}
        toggleTooltip={toggleTooltip}
      />
      <Rows
        openContextMenu={() => {}}
        toggleTooltip={toggleTooltip}
      />
    </svg>
    {
      height.arrowsY &&
      <Arrows
        direction="vertical"
        height={height}
        width={width}
      />
    }
    {
      width.arrowsX &&
      <Arrows
        direction="horizontal"
        height={height}
        width={width}
      />
    }
    <ContextMenuColumns
      closeMenu={closeContextMenu}
      event={contextEvent}
      reference={reference}
      setReference={setReference}
      show={showColumnContext}
      sortRows={sortRows}
      target={contextColumnTarget}
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
  contextColumnTarget: PropTypes.string.isRequired,
  contextEvent: PropTypes.shape({}),
  height: PropTypes.shape({
    arrowsY: PropTypes.bool,
    heatmap: PropTypes.number,
    pageY: PropTypes.number,
    wrapper: PropTypes.number,
  }).isRequired,
  openColumnContextMenu: PropTypes.func.isRequired,
  reference: PropTypes.string,
  setReference: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  showColumnContext: PropTypes.bool.isRequired,
  sortRows: PropTypes.func.isRequired,
  tooltip: PropTypes.shape({
    display: PropTypes.bool,
    left: PropTypes.number,
    text: PropTypes.string,
    top: PropTypes.number,
  }).isRequired,
  toggleTooltip: PropTypes.func.isRequired,
  width: PropTypes.shape({
    arrowsX: PropTypes.bool,
    heatmap: PropTypes.number,
    pageX: PropTypes.number,
    wrapper: PropTypes.number,
  }).isRequired,
};

export default Svg;
