import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import reorderIcons from './customize__reorder-icons';

const Reorder = ({
  cellSize,
  dimensions,
  show,
}) => (
  show &&
  <Fragment>
    <rect
      fill="#000"
      fillOpacity={0.3}
    />
    <g transform="translate(100 0)">
      { reorderIcons(dimensions.pageX, cellSize, 'col') }
    </g>
    <g transform="translate(0 100)">
      { reorderIcons(dimensions.pageY, cellSize, 'row') }
    </g>
  </Fragment>
);

Reorder.propTypes = {
  cellSize: PropTypes.number.isRequired,
  dimensions: PropTypes.shape({
    pageX: PropTypes.number,
    pageY: PropTypes.number,
  }).isRequired,
  show: PropTypes.bool.isRequired,
};

export default Reorder;
