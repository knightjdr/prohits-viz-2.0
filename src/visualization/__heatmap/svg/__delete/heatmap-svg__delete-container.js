import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Delete from './heatmap-svg__delete';

class DeleteContainer extends PureComponent {
  deleteItem = (id, type) => {
    const { x, y } = this.props.position;
    const index = type === 'col' ? x + id : y + id;
  }
  render() {
    return (
      <Delete
        cellSize={this.props.cellSize}
        deleteItem={this.deleteItem}
        dimensions={this.props.dimensions}
        show
      />
    );
  }
}

DeleteContainer.propTypes = {
  cellSize: PropTypes.number.isRequired,
  dimensions: PropTypes.shape({
    pageX: PropTypes.number,
    pageY: PropTypes.number,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  show: PropTypes.bool.isRequired,
};

export default DeleteContainer;
