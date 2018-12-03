import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import debounce from '../../../../helpers/debounce';
import getTextPosition from '../helpers/get-text-position';
import Segment from '../segment/segment-container';
import sortCircles from '../helpers/sort-circles';
import Text from '../text/text';
import textLimits from '../text/text-limits';
import textSize from '../../../../helpers/text-size';

/* The plot is being rotated -90 in main-segcircle-svg, so the "x" and
** and "y" here for text are reversed. I'm intentionaly leaving it like this
** because it makes calculating the text positions easier. */
export class CircleContainer extends Component {
  constructor(props) {
    super(props);
    const { circles, radius, thickness } = this.props;
    const sortedCircles = sortCircles(circles, 0);
    const readouts = sortedCircles.readouts.map(readout => readout.name);
    this.state = {
      hoveredText: null,
      readouts,
      circles: sortedCircles,
      space: thickness / 4,
      text: getTextPosition(readouts, radius),
    };
  }
  componentDidUpdate = (prevProps) => {
    const { radius, thickness } = prevProps;
    this.updateText(this.props, radius);
    this.updateThickness(this.props, thickness);
  }
  debouncedMouseEnter = debounce((circleIndex, segmentIndex) => {
    if (this.mouseOver) {
      this.handleMouseEnter(circleIndex, segmentIndex);
    }
  }, 100, false, () => { this.mouseOver = true; });
  handleMouseEnter = (circleIndex, segmentIndex) => {
    this.segmentEntered = true;
    const { radius } = this.props;
    const { circles, text } = this.state;
    const abundance = circles.segments[circleIndex].values[segmentIndex];
    const mertic = circles.segments[circleIndex].name;
    const position = text[segmentIndex];
    const readout = circles.readouts[segmentIndex].name;
    const string = `${readout}, ${mertic}: ${abundance}`;
    const width = textSize(string, 'Lato', '16px');
    this.setState({
      hoveredText: {
        x: textLimits.x(position.x, radius, 8),
        y: textLimits.y(position.y, position.yOffset, radius, width),
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
  updateText = ({ radius }, prevRadius) => {
    if (radius !== prevRadius) {
      this.setState(({ readouts }) => ({
        text: getTextPosition(readouts, radius),
      }));
    }
  }
  updateThickness = ({ thickness }, prevThickness) => {
    if (thickness !== prevThickness) {
      this.setState({
        space: thickness / 4,
      });
    }
  }
  render() {
    const { radius, thickness } = this.props;
    const { circles, readouts, space } = this.state;
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
              minAbundance={segment.minAbundance}
              radius={radius - (index * (thickness + space))}
              readouts={readouts}
              thickness={thickness}
              values={segment.values}
            />
          ))
        }
        <Text
          hoveredText={this.state.hoveredText}
          text={this.state.text}
          show={false}
        />
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
