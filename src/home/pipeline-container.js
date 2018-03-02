import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Pipeline from './pipeline';

export default class PipelineContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      path: {},
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateParameters(nextProps);
  }
  updateParameters = (next) => {
    const {
      columns,
      height,
      rows,
      start,
      width,
    } = next;
    if (
      start &&
      columns &&
      height &&
      rows &&
      width
    ) {
      const leftEdge = Math.round(next.width / 2);
      const y = Math.round(next.height * 0.4) + 28;
      const totalPoints = next.columns * next.rows;
      this.setState({
        data: Array.from({ length: totalPoints }, () => Math.floor(Math.random() * 90) + 10),
        path: {
          leftSlide: {
            x: 0,
            y,
            xP: leftEdge - 160,
          },
          leftCircle: {
            x: leftEdge - 140,
            y: y - 5,
            xP: leftEdge - 120,
          },
        },
      });
    }
  }
  render() {
    return (
      <Pipeline
        data={this.state.data}
        path={this.state.path}
      />
    );
  }
}

PipelineContainer.defaultProps = {
  columns: null,
  height: null,
  rows: null,
  width: null,
};

PipelineContainer.propTypes = {
  columns: PropTypes.number,
  height: PropTypes.number,
  rows: PropTypes.number,
  start: PropTypes.bool,
  width: PropTypes.number,
};
