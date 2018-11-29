import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

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
      text: [],
      textPosition: getTextPosition(readouts, radius),
    };
  }
  handleMouseEnter = (circleIndex, segmentIndex) => {
    const { circles, radius } = this.props;
    const { textPosition } = this.state;
    const abundance = circles.segments[circleIndex].values[segmentIndex];
    const position = textPosition[segmentIndex];
    const readout = circles.readouts[segmentIndex].name;
    const string = `${readout}: ${abundance}`;
    const width = textSize(string, 'Lato', '16px');
    this.setState(({ text }) => ({
      text: [
        ...text,
        {
          x: this.textX(position.x, radius, 8),
          y: this.textY(position.y, position.yOffset, radius, width),
          class: 'pie__text_hovered',
          id: readout,
          string,
          width: width + 4,
        },
      ],
    }));
  }
  handleMouseLeave = (segmentIndex) => {
    const { circles } = this.props;
    const readout = circles.readouts[segmentIndex].name;
    this.setState(({ text }) => {
      const index = text.findIndex(entry => entry.id === readout);
      if (index > -1) {
        return {
          text: text.filter((entry, i) => i !== index),
        };
      }
      return {};
    });
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
              handleMouseEnter={this.handleMouseEnter}
              handleMouseLeave={this.handleMouseLeave}
              key={segment.name}
              radius={radius - (index * (thickness + space))}
              readouts={readouts}
              thickness={thickness}
              values={segment.values}
            />
          ))
        }
        <Text text={this.state.text} />
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
