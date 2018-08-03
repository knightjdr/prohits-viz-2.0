import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationsSelector from '../../../../state/selectors/visualization/annotation-selector';
import ColumnSelector from '../../../../state/selectors/visualization/columns-selector';
import DimensionSelector from '../../../../state/selectors/visualization/dimension-selector';
import MarkerSelector from '../../../../state/selectors/visualization/marker-selector';
import Overlay from './heatmap-svg__overlay';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import Round from '../../../../helpers/round';
import RoundNearest from '../../../../helpers/round-nearest';
import RowNameSelector from '../../../../state/selectors/visualization/row-name-selector';
import SettingsSelector from '../../../../state/selectors/visualization/settings-selector';
import { addMarker } from '../../../../state/set/visualization/marker-actions';
import { setSelections } from '../../../../state/set/visualization/genes-actions';
import { updateList } from '../../../../state/set/visualization/annotation-actions';

export class OverlayContainer extends Component {
  constructor(props) {
    super(props);
    this.gElementRef = React.createRef();
    const {
      annotations,
      cellSize,
      dimensions,
      markers,
      position,
    } = this.props;
    this.state = {
      annotations: this.subsetAnnotations(annotations.list, dimensions, position),
      cursor: 'default',
      marker: {
        height: 0,
        show: false,
        width: 0,
        x: 0,
        y: 0,
      },
      markers: this.subsetMarkers(markers.list, cellSize, dimensions, position),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      annotations,
      dimensions,
      markers,
      position,
    } = this.props;
    this.updateAnnotations(nextProps, annotations, dimensions, position);
    this.updateMarkers(nextProps, markers, dimensions, position);
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
      this.props.addMarker(markerHeight, markerWidth, markerX, markerY);
    }
  }
  annotationInRange = (annotation, xRange, yRange) => (
    annotation.x >= xRange.start &&
    annotation.x <= xRange.end &&
    annotation.y >= yRange.start &&
    annotation.y <= yRange.end
  );
  annotationMouseMove = (e) => {
    const newAnnotations = [...this.state.annotations];
    newAnnotations[this.moveIndex] = {
      ...newAnnotations[this.moveIndex],
      x: e.clientX - this.boundary.x,
      y: e.clientY - this.boundary.y,
    };
    this.setState({
      annotations: newAnnotations,
    });
  }
  annotationMouseUp = (annotation, dimensions, position) => {
    // Calculate element position relative to heatmap.
    const { index, x, y } = annotation;
    let newX = x / dimensions.width;
    let newY = y / dimensions.height;

    // Get new annotation position relative to entire image.
    newX = Round(((newX * dimensions.pageX) + position.x) / dimensions.columns, 2);
    newY = Round(((newY * dimensions.pageY) + position.y) / dimensions.rows, 2);
    this.props.updateList(index, newX, newY);
  }
  handleAnimationMouseDown = (index) => {
    this.boundary = this.getBoundary();
    this.dragging = true;
    this.moveIndex = index;
    this.moveType = 'annotation';
    this.setState({
      cursor: 'pointer',
    });
  }
  handleMouseMove = (e) => {
    if (this.dragging) {
      if (this.moveType === 'annotation') {
        this.annotationMouseMove(e);
      } else {
        this.overlayMouseMove(e);
      }
    }
  }
  handleMouseUp = (e) => {
    this.dragging = false;

    const { dimensions, position } = this.props;
    if (this.moveType === 'annotation') {
      this.annotationMouseUp(this.state.annotations[this.moveIndex], dimensions, position);
    } else {
      this.overlayMouseUp(e);
    }

    // Clear.
    this.moveIndex = null;
    this.moveType = null;
  }
  handleOverlayMouseDown = (e) => {
    const { cellSize } = this.props;
    this.boundary = this.getBoundary();
    this.dragging = true;
    this.moveType = 'marker';
    this.startPosition = {
      x: RoundNearest(e.clientX - this.boundary.x, cellSize),
      y: RoundNearest(e.clientY - this.boundary.y, cellSize),
    };
    this.setState({
      cursor: 'crosshair',
      marker: {
        height: 0,
        left: 0,
        show: false,
        top: 0,
        width: 0,
      },
    });
  }
  markerInRange = (marker, xRange, yRange) => (
    (
      marker.x >= xRange.start &&
      marker.x <= xRange.end &&
      marker.y >= yRange.start &&
      marker.y <= yRange.end
    ) ||
    (
      marker.x + marker.width > xRange.start &&
      marker.x + marker.width <= xRange.end &&
      marker.y + marker.height > yRange.start &&
      marker.y + marker.height <= yRange.end
    )
  )
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
      markers,
      position,
      rows,
    } = this.props;
    const currentPos = {
      x: RoundNearest(e.clientX - this.boundary.x, cellSize),
      y: RoundNearest(e.clientY - this.boundary.y, cellSize),
    };
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
          x,
          y,
          width,
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
    }
  }
  selectMarkerGenes = (source, target, cellSize, list, start, viewStart, width, sortBy) => {
    const arrayStart = viewStart + Math.round(start / cellSize);
    const markerSpan = Math.round(width / cellSize);
    const selected = list.slice(arrayStart, arrayStart + markerSpan);
    this.props.setSelections(selected, source, target, true, sortBy);
  }
  subsetAnnotations = (annotations, dimensions, position) => {
    // Multiplier for positioning annotations correctly on current view.
    const multiplier = {
      x: (dimensions.width * dimensions.columns) / dimensions.pageX,
      y: (dimensions.height * dimensions.rows) / dimensions.pageY,
    };
    const xRange = {
      end: (position.x + dimensions.pageX) / dimensions.columns,
      start: position.x / dimensions.columns,
    };
    const yRange = {
      end: (position.y + dimensions.pageY) / dimensions.rows,
      start: position.y / dimensions.rows,
    };
    return annotations.reduce((filtered, annotation, index) => {
      if (this.annotationInRange(annotation, xRange, yRange)) {
        return [
          ...filtered,
          {
            index,
            text: annotation.text,
            x: Math.round((annotation.x - xRange.start) * multiplier.x),
            y: Math.round((annotation.y - yRange.start) * multiplier.y),
          },
        ];
      }
      return filtered;
    }, []);
  }
  subsetMarkers= (markers, cellSize, dimensions, position) => {
    const xRange = {
      end: position.x + dimensions.pageX,
      start: position.x,
    };
    const yRange = {
      end: position.y + dimensions.pageY,
      start: position.y,
    };
    return markers.reduce((filtered, marker) => {
      if (this.markerInRange(marker, xRange, yRange)) {
        return [
          ...filtered,
          {
            height: marker.height * cellSize,
            width: marker.width * cellSize,
            x: (marker.x - xRange.start) * cellSize,
            y: (marker.y - yRange.start) * cellSize,
          },
        ];
      }
      return filtered;
    }, []);
  }
  updateAnnotations = (
    { annotations, dimensions, position },
    prevAnnotations,
    prevDimensions,
    prevPosition,
  ) => {
    if (
      annotations.list.length !== prevAnnotations.list.length ||
      position.x !== prevPosition.x ||
      position.y !== prevPosition.y ||
      dimensions.pageX !== prevDimensions.pageX ||
      dimensions.pageY !== prevDimensions.pageY
    ) {
      this.setState({
        annotations: this.subsetAnnotations(annotations.list, dimensions, position),
      });
    }
  }
  updateMarkers = (
    {
      cellSize,
      markers,
      dimensions,
      position,
    },
    prevMarkers,
    prevDimensions,
    prevPosition,
  ) => {
    if (
      markers.list.length !== prevMarkers.list.length ||
      position.x !== prevPosition.x ||
      position.y !== prevPosition.y ||
      dimensions.pageX !== prevDimensions.pageX ||
      dimensions.pageY !== prevDimensions.pageY
    ) {
      this.setState({
        markers: this.subsetMarkers(markers.list, cellSize, dimensions, position),
      });
    }
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
      <Overlay
        annotations={this.state.annotations}
        cursor={this.state.cursor}
        fontSize={this.props.annotations.fontSize}
        handleAnimationMouseDown={this.handleAnimationMouseDown}
        handleMouseMove={this.handleMouseMove}
        handleMouseUp={this.handleMouseUp}
        handleOverlayMouseDown={this.handleOverlayMouseDown}
        height={this.props.dimensions.height}
        marker={this.state.marker}
        markerColor={this.props.markers.color}
        markers={this.state.markers}
        setRef={this.gElementRef}
        showAnnotations={this.props.annotations.show}
        showMarkers={this.props.markers.show}
        width={this.props.dimensions.width}
      />
    );
  }
}

OverlayContainer.propTypes = {
  addMarker: PropTypes.func.isRequired,
  annotations: PropTypes.shape({
    fontSize: PropTypes.number,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ),
    show: PropTypes.bool,
  }).isRequired,
  cellSize: PropTypes.number.isRequired,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  dimensions: PropTypes.shape({
    columns: PropTypes.number,
    height: PropTypes.number,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    rows: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  markers: PropTypes.shape({
    color: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    show: PropTypes.bool,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelections: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  annotations: AnnotationsSelector(state),
  cellSize: SettingsSelector(state, 'cellSize'),
  columns: ColumnSelector(state),
  dimensions: DimensionSelector(state),
  markers: MarkerSelector(state),
  position: PositionSelector(state),
  rows: RowNameSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  addMarker: (height, width, x, y) => {
    dispatch(addMarker(height, width, x, y));
  },
  setSelections: (list, source, target, replace, sortBy) => {
    dispatch(setSelections(list, source, target, replace, sortBy));
  },
  updateList: (index, x, y) => {
    dispatch(updateList(index, x, y));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OverlayContainer);

export default ConnectedContainer;
