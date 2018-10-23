import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Reorder from './customize__reorder';

class ReorderContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Reorder
        cellSize={this.props.cellSize}
        dimensions={this.props.dimensions}
        show
      />
    );
  }
}

ReorderContainer.propTypes = {
  cellSize: PropTypes.number.isRequired,
  dimensions: PropTypes.shape({
    pageX: PropTypes.number,
    pageY: PropTypes.number,
  }).isRequired,
  show: PropTypes.bool.isRequired,
};

export default ReorderContainer;
