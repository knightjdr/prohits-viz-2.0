import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Pipeline from './pipeline';

const cellWidth = 24;
const defaultWidth = 750;

export default class PipelineContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      path: {},
      rows: null,
      scale: null,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      height,
      hide,
      width,
    } = nextProps;
    this.updateParameters(height, hide, width);
  }
  updateParameters = (height, hide, width) => {
    if (
      !hide &&
      height &&
      width
    ) {
      const center = {
        h: Math.round(height / 2),
        w: Math.round(width / 2),
      };
      const columns = 3;
      const rows = Math.round((height / 5) / cellWidth);
      const scale = width / defaultWidth;
      const y = Math.round(height * 0.4) + 28;
      this.setState({
        data: Array.from({ length: rows * columns }, () => Math.floor(Math.random() * 90) + 10),
        path: {
          leftSlide: {
            x: 0,
            y,
            xP: center.w - 110,
          },
          rightSlide: {
            x: center.w + 130,
            y,
            xP: Math.round(center.w * 1.55),
            yP: y - (center.h / 5),
          },
        },
        rows,
        scale,
      });
    } else {
      this.setState({
        data: [],
        path: {},
        rows: null,
        scale: null,
      });
    }
  }
  render() {
    return (
      <Pipeline
        data={this.state.data}
        path={this.state.path}
        rows={this.state.rows}
        scale={this.state.scale}
      />
    );
  }
}

PipelineContainer.defaultProps = {
  height: null,
  width: null,
};

PipelineContainer.propTypes = {
  height: PropTypes.number,
  hide: PropTypes.bool.isRequired,
  width: PropTypes.number,
};
