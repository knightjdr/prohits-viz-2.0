import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Annotations from './heatmap-svg__annotations';
import AnnotationsSelector from '../../../../state/selectors/visualization/annotation-selector';
import DimensionSelector from '../../../../state/selectors/visualization/dimension-selector';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import Round from '../../../../helpers/round';
import { updateList } from '../../../../state/set/visualization/annotation-actions';

export class AnnotationsContainer extends Component {
  constructor(props) {
    super(props);
    this.gElementRef = React.createRef();
    const { annotations, dimensions, position } = this.props;
    this.state = {
      annotations: this.subsetAnnotations(annotations.list, dimensions, position),
      cursor: 'default',
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { annotations, dimensions, position } = this.props;
    this.updateAnnotations(nextProps, annotations, dimensions, position);
  }
  handleMouseDown = (index) => {
    const rect = this.gElementRef.current.getBoundingClientRect();
    this.boundary = {
      x: rect.left,
      y: rect.top,
    };
    this.moveIndex = index;
    this.dragging = true;
    this.setState({
      cursor: 'pointer',
    });
  }
  handleMouseMove = (e) => {
    if (this.dragging) {
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
  }
  handleMouseUp = () => {
    this.dragging = false;

    // Calculate element position relative to heatmap.
    const { index, x, y } = this.state.annotations[this.moveIndex];
    const { dimensions, position } = this.props;
    let newX = x / dimensions.width;
    let newY = y / dimensions.height;

    // Get new annotation position relative to entire image.
    newX = Round(((newX * dimensions.pageX) + position.x) / dimensions.columns, 2);
    newY = Round(((newY * dimensions.pageY) + position.y) / dimensions.rows, 2);
    this.props.updateList(index, newX, newY);

    // Clear index;
    this.moveIndex = null;
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
      if (
        annotation.x >= xRange.start &&
        annotation.x <= xRange.end &&
        annotation.y >= yRange.start &&
        annotation.y <= yRange.end
      ) {
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
  render() {
    return (
      <Annotations
        annotations={this.state.annotations}
        cursor={this.state.cursor}
        fontSize={this.props.annotations.fontSize}
        handleMouseDown={this.handleMouseDown}
        handleMouseMove={this.handleMouseMove}
        handleMouseUp={this.handleMouseUp}
        height={this.props.dimensions.height}
        setRef={this.gElementRef}
        show={this.props.annotations.show}
        width={this.props.dimensions.width}
      />
    );
  }
}

AnnotationsContainer.propTypes = {
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
  dimensions: PropTypes.shape({
    columns: PropTypes.number,
    height: PropTypes.number,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    rows: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  updateList: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  annotations: AnnotationsSelector(state),
  dimensions: DimensionSelector(state),
  position: PositionSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  updateList: (index, x, y) => {
    dispatch(updateList(index, x, y));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationsContainer);

export default ConnectedContainer;
