import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Arrows from './heatmap-svg__arrows';
import OnResize from '../../../../helpers/on-resize';

export class ArrowsContainer extends Component {
  constructor(props) {
    super(props);
    const {
      dimensions,
      direction,
      position,
      height,
      offset,
      width,
    } = this.props;
    const length = direction === 'horizontal' ? dimensions.columns : dimensions.rows;
    const pageType = direction === 'horizontal' ? 'pageX' : 'pageY';
    const vertex = direction === 'horizontal' ? 'x' : 'y';
    this.state = {
      arrowOpacity: this.setOpacity(position, vertex, length, dimensions[pageType]),
      elPosition: this.setPosition(direction, height, width, offset),
      length,
      page: dimensions[pageType],
      pageType,
      show: true,
      vertex,
    };
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.onResize);
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateCustomize(nextProps, this.props.updateID);
    this.updateElPosition(nextProps, this.props.height, this.props.width);
    this.updateOpacity(nextProps, this.props.position, this.state.vertex);
    this.updatePage(nextProps, this.props.dimensions, this.state.pageType);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    this.setState({ show: false });
    OnResize(this, this.resizeEnd, 800);
  }
  setOpacity = (position, vertex, length, page) => ({
    down: position[vertex] >= length - page,
    up: position[vertex] === 0,
  })
  setPosition = (direction, height, width, offset) => (
    direction === 'horizontal' ?
      {
        bottom: 40,
        right: ((window.innerWidth - width.wrapper) / 2) + 20,
        transform: 'rotate(-90deg)',
      }
      :
      {
        bottom: (height.wrapper - height.heatmap - 90) + (offset ? 30 : 0),
        right: ((window.innerWidth - width.wrapper) / 2) - 20,
        transform: null,
      }
  )
  changePosition = (change) => {
    const newPosition = {
      x: this.props.position.x,
      y: this.props.position.y,
    };
    const { length, page, vertex } = this.state;
    newPosition[vertex] += change;
    if (newPosition[vertex] <= 0) {
      newPosition[vertex] = 0;
    } else if (newPosition[vertex] >= length - page) {
      newPosition[vertex] = length - page;
    }
    this.props.updateXY(newPosition.x, newPosition.y);
  }
  resizeEnd = () => {
    this.updateAll(this.props);
  }
  updateAll = ({
    dimensions,
    direction,
    height,
    offset,
    position,
    width,
  }) => {
    const length = direction === 'horizontal' ? dimensions.columns : dimensions.rows;
    this.setState(({ pageType, vertex }) => ({
      arrowOpacity: this.setOpacity(position, vertex, length, dimensions[pageType]),
      elPosition: this.setPosition(direction, height, width, offset),
      length,
      page: dimensions[pageType],
      show: true,
    }));
  }
  updateCustomize = (nextProps, prevUpdateID) => {
    if (nextProps.updateID !== prevUpdateID) {
      this.updateAll(nextProps);
    }
  }
  updateElPosition = ({
    direction,
    height,
    offset,
    width,
  }, prevHeight, prevWidth) => {
    if (
      height.wrapper !== prevHeight.wrapper ||
      width.wrapper !== prevWidth.wrapper
    ) {
      this.setState({
        elPosition: this.setPosition(direction, height, width, offset),
      });
    }
  }
  updateOpacity = ({ position }, prevPosition, vertex) => {
    if (position[vertex] !== prevPosition[vertex]) {
      this.setState(({ length, page }) => ({
        arrowOpacity: this.setOpacity(position, vertex, length, page),
      }));
    }
  }
  updatePage = ({ dimensions }, prevDimensions, pageType) => {
    if (dimensions[pageType] !== prevDimensions[pageType]) {
      this.setState({
        page: dimensions[pageType],
      });
    }
  }
  render() {
    return (
      this.props.show &&
      <Arrows
        arrowOpacity={this.state.arrowOpacity}
        changePosition={this.changePosition}
        elPosition={this.state.elPosition}
        length={this.state.length}
        page={this.state.page}
        show={this.state.show}
      />
    );
  }
}

ArrowsContainer.defaultProps = {
  direction: 'vertical',
  offset: false,
  updateID: null,
};

ArrowsContainer.propTypes = {
  dimensions: PropTypes.shape({
    columns: PropTypes.number,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    rows: PropTypes.number,
  }).isRequired,
  direction: PropTypes.string,
  offset: PropTypes.bool,
  height: PropTypes.shape({
    heatmap: PropTypes.number,
    wrapper: PropTypes.number,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  updateXY: PropTypes.func.isRequired,
  updateID: PropTypes.number,
  width: PropTypes.shape({
    wrapper: PropTypes.number,
  }).isRequired,
};

export default ArrowsContainer;
