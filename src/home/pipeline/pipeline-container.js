import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Pipeline from './pipeline';

const cellWidth = 24;
const defaultWidth = 750;
const defaultIntervals = {
  leftSlide: 1.5,
  leftResizeStart: 1.25,
  leftResizeDuration: 0.25,
  rightAppearDelay: 2.0,
  rightResizeDuration: 0.5,
  rightResizeStart: 0.2,
  rightSlide: 1.5,
};

export default class PipelineContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clouds: {},
      data: [],
      draw: false,
      dude: {},
      end: null,
      intervals: {},
      path: {},
      rows: null,
      square: {},
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
      // scale intervals
      const intervals = {
        leftSlide: defaultIntervals.leftSlide * scale,
        leftResizeDuration: defaultIntervals.leftResizeDuration * scale,
        leftResizeStart: defaultIntervals.leftResizeStart * scale,
        rightAppearDelay: defaultIntervals.rightAppearDelay * scale,
        rightResizeDuration: defaultIntervals.rightResizeDuration * scale,
        rightResizeStart: defaultIntervals.rightResizeStart * scale,
        rightSlide: defaultIntervals.rightSlide * scale,
      };
      // set start of dude
      const cloudStart = intervals.leftSlide +
        ((intervals.rightAppearDelay - intervals.leftSlide) / 2);
      const startConfused = intervals.leftSlide * rows * columns;
      // set x, y and dims of various points;
      const y = Math.round(height * 0.4) + 28;
      const heatmap = {
        height: rows * cellWidth,
        width: columns * cellWidth,
        x: Math.round(center.w * 1.7),
        y: Math.round(y - (center.h / 5)),
      };
      this.setState({
        clouds: {
          dur: intervals.leftSlide,
          repeatCount: rows * columns,
          start: cloudStart,
          x: center.w - 85,
          y: y - 160,
        },
        data: Array.from({ length: rows * columns }, () => Math.floor(Math.random() * 90) + 10),
        draw: true,
        dude: {
          startConfused,
          durConfused: 3,
          startIdea: startConfused + 3,
          x: Math.round(center.w * 0.3),
          y: center.h,
        },
        end: startConfused + 6,
        intervals,
        path: {
          leftSlide: {
            x: 0,
            y,
            xP: center.w - 120,
          },
          rightSlide: {
            x: center.w + 130,
            y,
            xP: heatmap.x,
            yP: heatmap.y,
          },
        },
        square: {
          height: heatmap.height,
          width: heatmap.width,
          x: (heatmap.x - heatmap.width) + (cellWidth / 2),
          y: heatmap.y - ((cellWidth / 2) + 5),
        },
        rows,
      });
    } else {
      this.setState({
        clouds: {},
        data: [],
        draw: false,
        dude: {},
        end: null,
        intervals: {},
        path: {},
        rows: null,
        square: {},
      });
    }
  }
  render() {
    return (
      <Pipeline
        clouds={this.state.clouds}
        data={this.state.data}
        draw={this.state.draw}
        dude={this.state.dude}
        endAnimation={this.state.end}
        intervals={this.state.intervals}
        path={this.state.path}
        rows={this.state.rows}
        square={this.state.square}
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
