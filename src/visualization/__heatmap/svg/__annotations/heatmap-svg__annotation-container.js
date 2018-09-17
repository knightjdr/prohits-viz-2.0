import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AnnotationOverlay from './heatmap-svg__annotation';
import Round from '../../../../helpers/round';

export class AnnotationOverlayContainer extends Component {
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
    this.moveType = null;
    this.state = {
      annotations: this.subsetAnnotations(annotations.list, dimensions, position),
      cursor: 'default',
      dragging: false,
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
  }
  getBoundary = () => {
    const rect = this.gElementRef.current.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
    };
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
    this.props.updateAnnotation(index, newX, newY);
  }
  handleAnimationMouseDown = (index) => {
    this.boundary = this.getBoundary();
    this.moveIndex = index;
    this.setState({
      cursor: 'pointer',
      dragging: true,
    });
  }
  handleMouseMove = (e) => {
    if (this.state.dragging) {
      this.annotationMouseMove(e);
    }
  }
  handleMouseUp = () => {
    const { dimensions, position } = this.props;
    this.annotationMouseUp(this.state.annotations[this.moveIndex], dimensions, position);
    this.moveIndex = null;
    this.setState({
      dragging: false,
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
  render() {
    return (
      <AnnotationOverlay
        annotations={this.state.annotations}
        cursor={this.state.cursor}
        dragging={this.state.dragging}
        fontSize={this.props.annotations.fontSize}
        handleAnimationMouseDown={this.handleAnimationMouseDown}
        handleMouseMove={this.handleMouseMove}
        handleMouseUp={this.handleMouseUp}
        height={this.props.dimensions.height}
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

AnnotationOverlayContainer.propTypes = {
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
  updateAnnotation: PropTypes.func.isRequired,
};

export default AnnotationOverlayContainer;
