import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Overlay from './heatmap-svg__overlay';
import roundNearest from '../../../../helpers/round-nearest';

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
  coordinate = (vertex, current, start) => {
    const coord = current[vertex] < start[vertex] ? current[vertex] : start[vertex];
    return coord < 0 ? 0 : coord;
  }
  dimension = (vertex, page, current, start) => {
    const { cellSize, dimensions } = this.props;
    const max = cellSize * dimensions[page];
    let pos = current[vertex];
    if (pos < 0) {
      pos = 0;
    } else if (pos > max) {
      pos = max;
    }
    return Math.abs(pos - start[vertex]);
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
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }
  handleMouseDown = (e) => {
    const { cellSize } = this.props;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    this.boundary = this.getBoundary();
    this.dragging = true;
    this.startPosition = {
      x: roundNearest(e.clientX - this.boundary.x, cellSize),
      y: roundNearest(e.clientY - this.boundary.y, cellSize),
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
      roundNearest(x - this.boundary.x, cellSize),
      cellSize,
      dimensions.pageX,
    ),
    y: this.limitPos(
      roundNearest(y - this.boundary.y, cellSize),
      cellSize,
      dimensions.pageY,
    ),
  })
  overlayMouseMove = (e) => {
    const currentPos = {
      x: e.clientX - this.boundary.x,
      y: e.clientY - this.boundary.y,
    };
    const height = this.dimension('y', 'pageY', currentPos, this.startPosition);
    const width = this.dimension('x', 'pageX', currentPos, this.startPosition);
    const x = this.coordinate('x', currentPos, this.startPosition);
    const y = this.coordinate('y', currentPos, this.startPosition);
    this.setState({
      marker: {
        height,
        show: true,
        x,
        y,
        width,
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
      const x = this.coordinate('x', currentPos, this.startPosition);
      const y = this.coordinate('y', currentPos, this.startPosition);
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
    // start = current pixel position of the selection box start point.
    // viewStart = current position of the plot starting point as array index.
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
