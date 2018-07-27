import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Arrows from './heatmap-svg__arrows';
import DimensionSelector from '../../../../state/selectors/visualization/dimension-selector';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import { updatePosition } from '../../../../state/set/visualization/position-actions';

export class ArrowsContainer extends Component {
  constructor(props) {
    super(props);
    const {
      dimension,
      direction,
      position,
      height,
      width,
    } = this.props;
    const length = direction === 'horizontal' ? dimension.columns : dimension.rows;
    const pageType = direction === 'horizontal' ? 'pageX' : 'pageY';
    const vertex = direction === 'horizontal' ? 'x' : 'y';
    this.state = {
      arrowOpacity: this.setOpacity(position, vertex, length, dimension[pageType]),
      elPosition: this.setPosition(direction, height.heatmap, width.wrapper),
      length,
      page: dimension[pageType],
      pageType,
      vertex,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateOpacity(nextProps, this.props.position, this.state.vertex);
    this.updateElPosition(nextProps, this.props.height, this.props.width);
    this.updatePage(nextProps, this.props.dimension, this.state.pageType);
  }
  setOpacity = (position, vertex, length, page) => ({
    down: position[vertex] >= length - page,
    up: position[vertex] === 0,
  })
  setPosition = (direction, height, width) => (
    direction === 'horizontal' ?
      {
        bottom: window.innerHeight - height - 160,
        right: ((window.innerWidth - width) / 2) + 13,
        transform: 'rotate(-90deg)',
      }
      :
      {
        bottom: window.innerHeight - height - 152,
        right: ((window.innerWidth - width) / 2) - 15,
        transform: null,
      }
  )
  changePosition = (change) => {
    const newPosition = {
      x: this.props.position.x,
      y: this.props.position.y,
    };
    const { length, page, vertex } = this.state;
    newPosition[vertex] = this.props.position[vertex] + change;
    if (newPosition[vertex] <= 0) {
      newPosition[vertex] = 0;
    } else if (newPosition[vertex] >= length - page) {
      newPosition[vertex] = length - page;
    }
    this.props.updatePosition(newPosition.x, newPosition.y);
  }
  updateElPosition = ({ height, width }, prevHeight, prevWidth) => {
    if (
      height.heatmap !== prevHeight.heatmap ||
      width.wrapper !== prevWidth.wrapper
    ) {
      this.setState(({ direction }) => ({
        elPosition: this.setPosition(direction, height.heatmap, width.wrapper),
      }));
    }
  }
  updateOpacity = ({ position }, prevPosition, vertex) => {
    if (position[vertex] !== prevPosition[vertex]) {
      this.setState(({ length, page }) => ({
        arrowOpacity: this.setOpacity(position, vertex, length, page),
      }));
    }
  }
  updatePage = ({ dimension }, prevDimension, pageType) => {
    if (dimension[pageType] !== prevDimension[pageType]) {
      this.setState({
        page: dimension[pageType],
      });
    }
  }
  render() {
    return (
      <Arrows
        arrowOpacity={this.state.arrowOpacity}
        changePosition={this.changePosition}
        elPosition={this.state.elPosition}
        length={this.state.length}
        page={this.state.page}
      />
    );
  }
}

ArrowsContainer.defaultProps = {
  direction: 'vertical',
};

ArrowsContainer.propTypes = {
  dimension: PropTypes.shape({
    columns: PropTypes.number,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    rows: PropTypes.number,
  }).isRequired,
  direction: PropTypes.string,
  height: PropTypes.shape({
    heatmap: PropTypes.number,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  updatePosition: PropTypes.func.isRequired,
  width: PropTypes.shape({
    wrapper: PropTypes.number,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  dimension: DimensionSelector(state),
  position: PositionSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  updatePosition: (x, y) => {
    dispatch(updatePosition(x, y));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArrowsContainer);

export default ConnectedContainer;
