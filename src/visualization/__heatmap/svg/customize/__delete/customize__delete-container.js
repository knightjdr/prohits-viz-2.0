import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Delete from './customize__delete';

export const defaultRect = {
  height: 0,
  show: false,
  width: 0,
  x: 0,
  y: 0,
};

class DeleteContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rect: { ...defaultRect },
    };
  }
  deleteItem = (id, type) => {
    const {
      columns,
      deleteItem,
      position,
      rows,
      setSelections,
    } = this.props;
    let index;
    let name;
    let sortBy;
    let source;
    let target;
    if (type === 'col') {
      index = position.x + id;
      name = columns[index];
      sortBy = 'columnMap';
      source = 'columnsSelected';
      target = 'columns';
    } else {
      index = position.y + id;
      name = rows[index];
      sortBy = 'rowMap';
      source = 'rowsSelected';
      target = 'rows';
    }
    setSelections([name], source, target, false, sortBy);
    deleteItem(index, type);
    this.setState({ rect: { ...defaultRect } });
  }
  mouseEnter = (index, type) => {
    const { cellSize, dimensions } = this.props;
    const rect = {};
    if (type === 'col') {
      rect.height = 100 + (cellSize * dimensions.pageY);
      rect.width = cellSize;
      rect.x = 100 + (index * cellSize);
      rect.y = 0;
    } else {
      rect.height = cellSize;
      rect.width = 100 + (cellSize * dimensions.pageX);
      rect.x = 0;
      rect.y = 100 + (index * cellSize);
    }
    this.setState({
      rect: {
        ...rect,
        show: true,
      },
    });
  }
  mouseLeave = () => {
    this.setState({
      rect: {
        show: false,
      },
    });
  }
  render() {
    return (
      <Delete
        cellSize={this.props.cellSize}
        deleteItem={this.deleteItem}
        dimensions={this.props.dimensions}
        mouseEnter={this.mouseEnter}
        mouseLeave={this.mouseLeave}
        rect={this.state.rect}
        show={this.props.show}
      />
    );
  }
}

DeleteContainer.propTypes = {
  cellSize: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteItem: PropTypes.func.isRequired,
  dimensions: PropTypes.shape({
    pageX: PropTypes.number,
    pageY: PropTypes.number,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelections: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default DeleteContainer;
