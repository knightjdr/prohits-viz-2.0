import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import deleteIcons from './delete-icons';

const Delete = ({
  cellSize,
  deleteItem,
  dimensions,
  show,
}) => (
  show &&
  <Fragment>
    <g transform="translate(100 0)">
      { deleteIcons(dimensions.pageX, cellSize, deleteItem, 'col') }
    </g>
    <g transform="translate(0 100)">
      { deleteIcons(dimensions.pageY, cellSize, deleteItem, 'row') }
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
  show: PropTypes.bool.isRequired,
};

export default Delete;
