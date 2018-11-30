import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import debounce from '../../../../helpers/debounce';
import getTextPosition from '../helpers/get-text-position';
import Segment from '../segment/segment-container';
import Text from '../text/text';
import textSize from '../../../../helpers/text-size';

/* The plot is being rotated -90 in main-segcircle-svg, so the "x" and
** and "y" here for text are reversed. I'm intentionaly leaving it like this
** because it makes calculating the text positions easier. */
export class CircleContainer extends Component {
  constructor(props) {
    super(props);
    const { circles, radius, thickness } = this.props;
    const readouts = circles.readouts.map(readout => readout.name);
    this.state = {
      readouts,
      space: thickness / 4,
      hoveredText: null,
      textPosition: getTextPosition(readouts, radius),
    };
  }
  debouncedMouseEnter = debounce((circleIndex, segmentIndex) => {
    if (this.mouseOver) {
      this.handleMouseEnter(circleIndex, segmentIndex);
    }
  }, 100, false, () => { this.mouseOver = true; });
  handleMouseEnter = (circleIndex, segmentIndex) => {
    this.segmentEntered = true;
    const { circles, radius } = this.props;
    const { textPosition } = this.state;
    const abundance = circles.segments[circleIndex].values[segmentIndex];
    const mertic = circles.segments[circleIndex].name;
    const position = textPosition[segmentIndex];
    const readout = circles.readouts[segmentIndex].name;
    const string = `${readout}, ${mertic}: ${abundance}`;
    const width = textSize(string, 'Lato', '16px');
    this.setState({
      hoveredText: {
        x: this.textX(position.x, radius, 8),
        y: this.textY(position.y, position.yOffset, radius, width),
        id: readout,
        string,
        width: width + 4,
      },
    });
  }
  handleMouseLeave = () => {
    if (this.segmentEntered) {
      this.segmentEntered = false;
      this.setState({
        hoveredText: null,
      });
    }
    this.mouseOver = false;
  }
  textX = (x, radius, width) => {
    if (x < -radius) {
      return -radius;
    } if (x > radius - width) {
      return radius - width;
    }
    return x;
  }
  textY = (y, offset, radius, width) => {
    const position = offset ? y - width : y;
    if (position < -radius) {
      return -radius;
    } if (position > radius - width) {
      return radius - width;
    }
    return position;
  }
  render() {
    const { circles, radius, thickness } = this.props;
    const { readouts, space } = this.state;
    return (
      <Fragment>
        {
          circles.segments.map((segment, index) => (
            <Segment
              abundanceCap={segment.abundanceCap}
              circleIndex={index}
              color={segment.color}
              handleMouseEnter={this.debouncedMouseEnter}
              handleMouseLeave={this.handleMouseLeave}
              key={segment.name}
              radius={radius - (index * (thickness + space))}
              readouts={readouts}
              thickness={thickness}
              values={segment.values}
            />
          ))
        }
        <Text hoveredText={this.state.hoveredText} />
      </Fragment>
    );
  }
}

CircleContainer.propTypes = {
  circles: PropTypes.shape({
    readouts: PropTypes.arrayOf(
      PropTypes.shape({
        known: PropTypes.bool,
        name: PropTypes.string,
      }),
    ),
    order: PropTypes.arrayOf(PropTypes.number),
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.number),
      }),
    ),
  }).isRequired,
  radius: PropTypes.number.isRequired,
  thickness: PropTypes.number.isRequired,
};

export default CircleContainer;
