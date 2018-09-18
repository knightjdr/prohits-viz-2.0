import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Tooltips from './heatmap-svg__tooltips';

export class TooltipsContainer extends Component {
  constructor(props) {
    super(props);
    this.gElementRef = React.createRef();
  }
  componentDidMount = () => {
    const { plotTranslate } = this.props;
    this.boundary = this.getBoundary(plotTranslate);
  }
  componentDidUpdate = () => {
    const { plotTranslate } = this.props;
    this.boundary = this.getBoundary(plotTranslate);
  }
  getBoundary = (translate) => {
    const rect = this.gElementRef.current.getBoundingClientRect();
    return {
      x: rect.left - translate,
      y: rect.top,
    };
  }
  setBoundary = (show, prevShow) => {
    if (
      show &&
      show !== prevShow
    ) {
      this.boundary = this.getBoundary();
    }
  }
  clearTooltip = () => {
    this.props.toggleTooltip(false);
  }
  formatText = obj => (
    Object.entries(obj).map(([key, value]) => (
      <div key={key}>
        {key}: {value}
      </div>
    ))
  )
  handleMouseMove = (e) => {
    const {
      cellSize,
      dimensions,
      plotTranslate,
      position,
      rows,
      toggleTooltip,
    } = this.props;
    const cell = this.hoveredCell(
      e.clientX - plotTranslate,
      e.clientY,
      cellSize,
      position,
      dimensions,
    );
    const text = this.formatText(rows[cell.y].data[cell.x]);
    const x = e.clientX + 15;
    const y = e.clientY - 50;
    toggleTooltip(true, true, text, x, y);
  }
  hoveredCell = (x, y, cellSize, position, dimensions) => {
    const nearestX = this.limitPos(
      Math.floor((x - this.boundary.x) / cellSize),
      dimensions.pageX - 1,
    );
    const nearestY = this.limitPos(
      Math.floor((y - this.boundary.y) / cellSize),
      dimensions.pageY - 1,
    );
    return {
      x: nearestX + position.x,
      y: nearestY + position.y,
    };
  }
  limitPos = (pos, page) => {
    if (pos < 0) {
      return 0;
    } else if (pos > page) {
      return page;
    }
    return pos;
  }
  render() {
    return (
      <Tooltips
        clearTooltip={this.clearTooltip}
        handleMouseMove={this.handleMouseMove}
        height={this.props.dimensions.height}
        mouseEvents={this.props.showTooltips}
        setRef={this.gElementRef}
        width={this.props.dimensions.width}
      />
    );
  }
}

TooltipsContainer.propTypes = {
  cellSize: PropTypes.number.isRequired,
  dimensions: PropTypes.shape({
    height: PropTypes.number,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    plotTranslate: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  plotTranslate: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({}),
      ),
    }),
  ).isRequired,
  showTooltips: PropTypes.bool.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

export default TooltipsContainer;
