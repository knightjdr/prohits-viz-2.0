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
    const { plot, radius, thickness } = this.props;
    const config = this.configCircle(plot, radius);
    this.state = {
      circles: config.circles,
      hoveredText: null,
      readouts: config.readouts,
      space: thickness / 4,
      text: config.text,
    };
  }
  componentDidUpdate = (prevProps) => {
    const { plot, radius, thickness } = prevProps;
    this.updateCircles(this.props, plot.name);
    this.updateText(this.props, radius);
    this.updateThickness(this.props, thickness);
  }
  configCircle = (circles, radius) => {
    const sortedCircles = sortCircles(circles, 0);
    const readouts = sortedCircles.readouts.map(readout => readout.name);
    return {
      circles: sortedCircles,
      readouts,
      text: getTextPosition(readouts, radius),
    };
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
  updateCircles = ({
    plot,
    radius,
  }, prevName) => {
    if (plot.name !== prevName) {
      const config = this.configCircle(plot, radius);
      this.setState({
        circles: config.circles,
        readouts: config.readouts,
        text: config.text,
      });
    }
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
    const { radius, settings, thickness } = this.props;
    const { circles, readouts, space } = this.state;
    return (
      <Fragment>
        {
          circles.segments.map((segment, index) => (
            <Segment
              abundanceCap={settings[index].abundanceCap}
              circleIndex={index}
              color={settings[index].color}
              handleMouseEnter={this.debouncedMouseEnter}
              handleMouseLeave={this.handleMouseLeave}
              key={segment.name}
              minAbundance={settings[index].minAbundance}
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
  plot: PropTypes.shape({
    name: PropTypes.string,
    readouts: PropTypes.arrayOf(
      PropTypes.shape({
        known: PropTypes.bool,
        name: PropTypes.string,
      }),
    ),
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.number),
      }),
    ),
  }).isRequired,
  radius: PropTypes.number.isRequired,
  settings: PropTypes.arrayOf(
    PropTypes.shape({
      abundanceCap: PropTypes.number,
      color: PropTypes.string,
      minAbundance: PropTypes.number,
    }),
  ).isRequired,
  thickness: PropTypes.number.isRequired,
};

export default CircleContainer;
