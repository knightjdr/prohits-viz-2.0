import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import deleteIcons from './customize__delete-icons';

const Delete = ({
  cellSize,
  deleteItem,
  dimensions,
  mouseEnter,
  mouseLeave,
  rect,
  show,
}) => (
  show &&
  <Fragment>
    <rect
      fill="#000"
      fillOpacity={0.3}
      height={rect.height}
      visibility={rect.show ? 'visible' : 'hidden'}
      width={rect.width}
      x={rect.x}
      y={rect.y}
    />
    <g transform="translate(100 0)">
      { deleteIcons(dimensions.pageX, cellSize, deleteItem, 'col', mouseEnter, mouseLeave) }
    </g>
    <g transform="translate(0 100)">
      { deleteIcons(dimensions.pageY, cellSize, deleteItem, 'row', mouseEnter, mouseLeave) }
    </g>
  </Fragment>
);

Delete.propTypes = {
  cellSize: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
  dimensions: PropTypes.shape({
    pageX: PropTypes.number,
    pageY: PropTypes.number,
  }).isRequired,
  mouseEnter: PropTypes.func.isRequired,
  mouseLeave: PropTypes.func.isRequired,
  rect: PropTypes.shape({
    height: PropTypes.number,
    show: PropTypes.bool,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  show: PropTypes.bool.isRequired,
};

export default Delete;
