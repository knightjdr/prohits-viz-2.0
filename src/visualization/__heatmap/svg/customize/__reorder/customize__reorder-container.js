import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import between from '../../../../../helpers/between';
import Reorder from './customize__reorder';
import setFontSize from '../../font-size/font-size';

const LABEL_WIDTH = 100;

class ReorderContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { cellSize, dimensions } = this.props;
    this.state = {
      circle: {
        radius: 0,
        x: 0,
        y: 0,
      },
      coverItem: {
        height: 0,
        width: 0,
        x: 0,
        y: 0,
      },
      fontSize: setFontSize(cellSize),
      lines: {
        a: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 0,
        },
        b: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 0,
        },
      },
      showIcons: true,
      text: {
        height: 0,
        name: null,
        rotation: 0,
        width: 0,
        x: 0,
        y: 0,
      },
      ...this.setDimensions(cellSize, dimensions),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { cellSize, dimensions } = this.props;
    this.updateFontSize(nextProps, cellSize);
    this.updateDimensions(nextProps, cellSize, dimensions);
  }
  getIndex = (cellSize, dimensions, currPosition, type) => {
    if (type === 'col') {
      const index = Math.floor((currPosition - LABEL_WIDTH) / cellSize);
      return between(index, 0, dimensions.pageX);
    }
    const index = Math.floor((currPosition - LABEL_WIDTH) / cellSize);
    return between(index, 0, dimensions.pageY);
  }
  setColumnLine = (cellSize, dimensions, index) => {
    const lineHeight = cellSize * dimensions.pageY;
    const x = LABEL_WIDTH + (cellSize * index);
    return {
      a: {
        x1: x,
        x2: x,
        y1: LABEL_WIDTH,
        y2: LABEL_WIDTH + lineHeight,
      },
      b: {
        x1: x + cellSize,
        x2: x + cellSize,
        y1: LABEL_WIDTH,
        y2: LABEL_WIDTH + lineHeight,
      },
    };
  }
  setRowLine = (cellSize, dimensions, index) => {
    const lineWidth = cellSize * dimensions.pageX;
    const y = LABEL_WIDTH + (cellSize * index);
    return {
      a: {
        x1: LABEL_WIDTH,
        x2: LABEL_WIDTH + lineWidth,
        y1: y,
        y2: y,
      },
      b: {
        x1: LABEL_WIDTH,
        x2: LABEL_WIDTH + lineWidth,
        y1: y + cellSize,
        y2: y + cellSize,
      },
    };
  }
  setDimensions = (cellSize, dimensions) => ({
    column: {
      height: LABEL_WIDTH,
      width: cellSize * dimensions.pageX,
    },
    row: {
      height: cellSize * dimensions.pageY,
      width: LABEL_WIDTH,
    },
  })
  mouseDownColumn = (e, index) => {
    const {
      cellSize,
      columnNames,
      dimensions,
      position,
    } = this.props;
    const radius = cellSize / 2;
    const x = LABEL_WIDTH + (cellSize * index);
    const circle = {
      radius,
      x: x + radius,
      y: radius,
    };
    const coverItem = {
      height: LABEL_WIDTH,
      width: cellSize,
      x,
      y: 0,
    };
    const lines = this.setColumnLine(cellSize, dimensions, index);
    const text = {
      height: cellSize,
      name: columnNames[position.x + index],
      rotation: 90,
      transform: `translate(-2 ${-radius})`,
      width: LABEL_WIDTH - cellSize,
      x: x + radius,
      y: cellSize + 2,
    };
    this.selectedItem = {
      dropIndex: index,
      index,
      startX: e.clientX,
      type: 'col',
      x: e.clientX,
    };
    this.setState({
      circle,
      coverItem,
      lines,
      showIcons: false,
      text,
    });
  }
  mouseDownRow = (e, index) => {
    const {
      cellSize,
      dimensions,
      position,
      rowNames,
    } = this.props;
    const radius = cellSize / 2;
    const y = LABEL_WIDTH + (cellSize * index);
    const circle = {
      radius,
      x: radius,
      y: y + radius,
    };
    const coverItem = {
      height: LABEL_WIDTH,
      width: cellSize,
      x: 0,
      y,
    };
    const lines = this.setRowLine(cellSize, dimensions, index);
    const text = {
      height: cellSize,
      name: rowNames[position.y + index],
      rotation: 0,
      transform: `translate(-2 ${-radius})`,
      width: LABEL_WIDTH - cellSize,
      x: cellSize + 2,
      y: y + radius,
    };
    this.selectedItem = {
      dropIndex: index,
      index,
      startY: e.clientY,
      type: 'row',
      y: e.clientY,
    };
    this.setState({
      circle,
      coverItem,
      lines,
      showIcons: false,
      text,
    });
  }
  mouseMoveColumn = (e) => {
    const moved = e.clientX - this.selectedItem.x;
    this.selectedItem.x = e.clientX;
    this.setState(({ circle, column, text }, { cellSize, dimensions }) => {
      const newX = circle.x + moved;
      const limit = LABEL_WIDTH + (column.width - circle.radius);
      const x = between(newX, LABEL_WIDTH, limit);
      this.selectedItem.dropIndex = this.getIndex(cellSize, dimensions, x, 'col');
      const textX = text.x + moved;
      return {
        circle: {
          ...circle,
          x,
        },
        lines: this.setColumnLine(cellSize, dimensions, this.selectedItem.dropIndex),
        text: {
          ...text,
          x: textX < limit ? textX : limit,
        },
      };
    });
  }
  mouseMoveRow = (e) => {
    const moved = e.clientY - this.selectedItem.y;
    this.selectedItem.y = e.clientY;
    this.setState(({ circle, row, text }, { cellSize, dimensions }) => {
      const newY = circle.y + moved;
      const limit = LABEL_WIDTH + (row.height - circle.radius);
      const y = between(newY, LABEL_WIDTH, limit);
      this.selectedItem.dropIndex = this.getIndex(cellSize, dimensions, y, 'row');
      const textY = text.y + moved;
      return {
        circle: {
          ...circle,
          y,
        },
        lines: this.setRowLine(cellSize, dimensions, this.selectedItem.dropIndex),
        text: {
          ...text,
          y: textY < limit ? textY : limit,
        },
      };
    });
  }
  mouseUp = () => {
    if (
      this.selectedItem
      && !this.state.showIcons
    ) {
      this.setState({ showIcons: true });
      const {
        dropIndex,
        index,
        type,
      } = this.selectedItem;
      this.props.reorder(index, dropIndex, type);
    }
  }
  updateDimensions = ({ cellSize, dimensions }, prevCellSize, prevDimensions) => {
    if (
      cellSize !== prevCellSize
      || dimensions.pageX !== prevDimensions.pageX
      || dimensions.pageY !== prevDimensions.pageY
    ) {
      this.setState({
        ...this.setDimensions(cellSize, dimensions),
      });
    }
  }
  updateFontSize = ({ cellSize }, prevCellSize) => {
    if (cellSize !== prevCellSize) {
      this.setState({
        fontSize: setFontSize(cellSize),
      });
    }
  }
  render() {
    return (
      <Reorder
        cellSize={this.props.cellSize}
        circle={this.state.circle}
        column={this.state.column}
        coverItem={this.state.coverItem}
        dimensions={this.props.dimensions}
        fontSize={this.state.fontSize}
        lines={this.state.lines}
        mouseDownColumn={this.mouseDownColumn}
        mouseDownRow={this.mouseDownRow}
        mouseMoveColumn={this.mouseMoveColumn}
        mouseMoveRow={this.mouseMoveRow}
        mouseUp={this.mouseUp}
        row={this.state.row}
        show={this.props.show}
        showIcons={this.state.showIcons}
        text={this.state.text}
      />
    );
  }
}

ReorderContainer.propTypes = {
  cellSize: PropTypes.number.isRequired,
  columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  dimensions: PropTypes.shape({
    pageX: PropTypes.number,
    pageY: PropTypes.number,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  reorder: PropTypes.func.isRequired,
  rowNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  show: PropTypes.bool.isRequired,
};

export default ReorderContainer;
