import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Columns from './__columns/heatmap-svg__columns-container';
import Tooltip from './__tooltip/svg__tooltip';

import './heatmap-svg.css';

const Svg = ({
  height,
  show,
  tooltip,
  toggleTooltip,
  width,
}) => (
  show &&
  <Fragment>
    <svg xmlns="http://www.w3.org/2000/svg" height={height.wrapper} width={width.wrapper}>
      <rect fill="#f44336" height={height.heatmap} width={width.heatmap} x="100" y="100" />
      <Columns toggleTooltip={toggleTooltip} />
    </svg>
    <Tooltip {...tooltip} />
  </Fragment>
);

Svg.propTypes = {
  height: PropTypes.shape({
    arrowsY: PropTypes.bool,
    heatmap: PropTypes.number,
    pageY: PropTypes.number,
    wrapper: PropTypes.number,
  }).isRequired,
  show: PropTypes.bool.isRequired,
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
