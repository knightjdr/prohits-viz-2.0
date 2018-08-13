import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Arrows from './__arrows/heatmap-svg__arrows-container';
import Columns from './__columns/heatmap-svg__columns-container';
import ContextColumns from './context-menu/context-menu-columns';
import ContextRows from './context-menu/context-menu-rows';
import Overlay from './__overlay/heatmap-svg__overlay-container';
import Plot from './plot/heatmap-svg__plot-container';
import Rows from './__rows/heatmap-svg__rows-container';
import StatusBar from './__status/heatmap-svg__status-container';
import Tooltip from './__tooltip/svg__tooltip';

import './heatmap-svg.css';

const Svg = ({
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
      <Fragment>
        <svg
          id="svg-main"
          height={height.wrapper}
          width={width.wrapper}
          xmlns="http://www.w3.org/2000/svg"
        >
          <Plot />
          <Overlay />
          <Columns
            handleClick={handleClick}
            openContextMenu={(e, target) => { openContextMenu(e, target, 'column'); }}
            toggleTooltip={toggleTooltip}
          />
          <Rows
            handleClick={handleClick}
            openContextMenu={(e, target) => { openContextMenu(e, target, 'row'); }}
            toggleTooltip={toggleTooltip}
          />
        </svg>
        <StatusBar
          canTranslate={width.canTranslate}
          fixLeft={fixLeft}
          translate={translateLeft}
          width={width.wrapper}
        />
        <Arrows
          direction="vertical"
          height={height}
          show={height.arrowsY}
          width={width}
        />
        <Arrows
          direction="horizontal"
          height={height}
          show={width.arrowsX}
          width={width}
        />
        <ContextColumns
          closeMenu={closeContextMenu}
          event={contextEvent}
          reference={reference}
          setSelections={setSelections}
          setReference={setReference}
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
    }
  </div>
);

Svg.defaultProps = {
  contextEvent: null,
  reference: null,
};

Svg.propTypes = {
  closeContextMenu: PropTypes.func.isRequired,
  contextTarget: PropTypes.string.isRequired,
  contextEvent: PropTypes.shape({}),
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

export default Svg;
