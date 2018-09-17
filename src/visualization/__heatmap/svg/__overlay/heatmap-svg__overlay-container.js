import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Overlay from './heatmap-svg__overlay';
import RoundNearest from '../../../../helpers/round-nearest';

export class OverlayContainer extends Component {
  constructor(props) {
    super(props);
    this.gElementRef = React.createRef();
    this.moveType = null;
    this.state = {
      cursor: 'default',
      marker: {
        height: 0,
        show: false,
        width: 0,
        x: 0,
        y: 0,
      },
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      dimensions,
      position,
    } = this.props;
    this.updateOverlay(nextProps, dimensions, position);
  }
  getBoundary = () => {
    const rect = this.gElementRef.current.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
    };
  }
  addMarker = (cellSize, height, position, record, width) => {
    if (record) {
      const markerHeight = height / cellSize;
      const markerWidth = width / cellSize;
      const markerX = (this.startPosition.x / cellSize) + position.x;
      const markerY = (this.startPosition.y / cellSize) + position.y;
      this.props.addMarkerBox(markerHeight, markerWidth, markerX, markerY);
    }
  }
  handleMouseMove = (e) => {
    if (this.dragging) {
      this.overlayMouseMove(e);
    }
  }
  handleMouseUp = (e) => {
    if (this.dragging) {
      this.dragging = false;
      this.overlayMouseUp(e);
    }
  }
  handleMouseDown = (e) => {
    const { cellSize } = this.props;
    this.boundary = this.getBoundary();
    this.dragging = true;
    this.startPosition = {
      x: RoundNearest(e.clientX - this.boundary.x, cellSize),
      y: RoundNearest(e.clientY - this.boundary.y, cellSize),
    };
    this.setState({
      cursor: 'crosshair',
      marker: {
        height: 0,
        left: 0,
        show: true,
        top: 0,
        width: 0,
      },
    });
  }
  limitPos = (pos, cellSize, dimension) => {
    if (pos < 0) {
      return 0;
    } else if (pos > cellSize * dimension) {
      return cellSize * dimension;
    }
    return pos;
  }
  nearestCell = (x, y, cellSize, dimensions) => ({
    x: this.limitPos(
      RoundNearest(x - this.boundary.x, cellSize),
      cellSize,
      dimensions.pageX,
    ),
    y: this.limitPos(
      RoundNearest(y - this.boundary.y, cellSize),
      cellSize,
      dimensions.pageY,
    ),
  })
  overlayMouseMove = (e) => {
    const currentPos = {
      x: e.clientX - this.boundary.x,
      y: e.clientY - this.boundary.y,
    };
    const x = currentPos.x < this.startPosition.x ? currentPos.x : this.startPosition.x;
    const y = currentPos.y < this.startPosition.y ? currentPos.y : this.startPosition.y;
    this.setState({
      marker: {
        height: Math.abs(currentPos.y - this.startPosition.y),
        show: true,
        x,
        y,
        width: Math.abs(currentPos.x - this.startPosition.x),
      },
    });
  }
  overlayMouseUp = (e) => {
    const {
      cellSize,
      columns,
      dimensions,
      markers,
      position,
      rows,
    } = this.props;
    const currentPos = this.nearestCell(e.clientX, e.clientY, cellSize, dimensions);
    const height = Math.abs(currentPos.y - this.startPosition.y);
    const width = Math.abs(currentPos.x - this.startPosition.x);
    if (
      height > 0 &&
      width > 0
    ) {
      const x = currentPos.x < this.startPosition.x ? currentPos.x : this.startPosition.x;
      const y = currentPos.y < this.startPosition.y ? currentPos.y : this.startPosition.y;
      this.setState({
        marker: {
          height,
          show: true,
          width,
          x,
          y,
        },
      });
      this.addMarker(cellSize, height, position, markers.record, width);
      this.selectMarkerGenes(
        'columns',
        'columnsSelected',
        cellSize,
        columns.names,
        x,
        position.x,
        width,
        'columnMap',
      );
      this.selectMarkerGenes('rows', 'rowsSelected', cellSize, rows, y, position.y, height, 'rowMap');
    } else {
      this.setState({
        marker: {
          height: 0,
          show: false,
          width: 0,
          x: 0,
          y: 0,
        },
      });
    }
  }
  selectMarkerGenes = (source, target, cellSize, list, start, viewStart, width, sortBy) => {
    const arrayStart = viewStart + Math.round(start / cellSize);
    const markerSpan = Math.round(width / cellSize);
    const selected = list.slice(arrayStart, arrayStart + markerSpan);
    this.props.setSelectedGenes(selected, source, target, true, sortBy);
  }
  updateOverlay = ({ dimensions, position }, prevDimensions, prevPosition) => {
    if (
      position.x !== prevPosition.x ||
      position.y !== prevPosition.y ||
      dimensions.pageX !== prevDimensions.pageX ||
      dimensions.pageY !== prevDimensions.pageY
    ) {
      this.setState({
        marker: {
          height: 0,
          show: false,
          x: 0,
          y: 0,
          width: 0,
        },
      });
    }
  }
  render() {
    return (
      this.props.showSelectionbox &&
      <Overlay
        cursor={this.state.cursor}
        handleMouseMove={this.handleMouseMove}
        handleMouseUp={this.handleMouseUp}
        handleMouseDown={this.handleMouseDown}
        height={this.props.dimensions.height}
        marker={this.state.marker}
        setRef={this.gElementRef}
        showSelectionbox={this.props.showSelectionbox}
        width={this.props.dimensions.width}
      />
    );
  }
}

OverlayContainer.propTypes = {
  addMarkerBox: PropTypes.func.isRequired,
  cellSize: PropTypes.number.isRequired,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  dimensions: PropTypes.shape({
    height: PropTypes.number,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  markers: PropTypes.shape({
    record: PropTypes.bool,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedGenes: PropTypes.func.isRequired,
  showSelectionbox: PropTypes.bool.isRequired,
};

export default OverlayContainer;
