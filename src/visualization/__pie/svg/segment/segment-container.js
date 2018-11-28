import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import addColor from './add-color';
import arrSort from '../../../../helpers/arr-sort-by-key';
import arrSortTwoKey from '../../../../helpers/arr-sort-by-two-keys';
import colorGradient from '../../../color/color-gradient';
import createSegments from './segment-slices';
import Segment from './segment';
import setRange from '../../../../helpers/set-range';
import Text from '../text/text';
import textSize from '../../../../helpers/text-size';

export class SegmentContainer extends Component {
  constructor(props) {
    super(props);
    const {
      abundanceCap,
      radius,
      segmentColor,
      segments,
      sort,
    } = this.props;
    this.segmentGradient = colorGradient(segmentColor, process.env.REACT_APP_NUM_GRADIENT_COLORS);
    this.segmentRange = setRange(0, abundanceCap, 0, process.env.REACT_APP_NUM_GRADIENT_COLORS - 1);
    const radii = this.calculateRadii(radius);
    const sortedWithColor = addColor(
      this.sortSegments(segments, sort),
      this.segmentGradient,
      this.segmentRange,
    );
    this.state = {
      radii,
      segments: createSegments(sortedWithColor, radii),
      text: [],
    };
  }
  calculateRadii = radius => ({
    full: radius,
    segment: Math.floor(radius * 0.8),
    text: Math.floor(radius * 1.05),
  })
  handleMouseEnter = (abundance, readout, position) => {
    const string = `${readout}: ${abundance}`;
    const width = textSize(string, 'Lato', '16px');
    this.setState(({ text }) => ({
      text: [
        ...text,
        {
          ...position,
          y: position.xOffset ? position.y - width : position.y,
          class: 'pie__text_hovered',
          id: readout,
          string,
          width: width + 4,
        },
      ],
    }));
  }
  handleMouseLeave = (readout) => {
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
  sortSegments = (segments, sort) => (
    sort
      ? arrSortTwoKey(segments, 'known', 'abundance', 'des', 'bool', 'numeric')
      : arrSort(segments, 'abundance', 'des', 'numeric')
  )
  render() {
    return (
      <Fragment>
        <Segment
          handleMouseEnter={this.handleMouseEnter}
          handleMouseLeave={this.handleMouseLeave}
          radii={this.state.radii}
          segments={this.state.segments}
        />
        <Text text={this.state.text} />
      </Fragment>
    );
  }
}

SegmentContainer.propTypes = {
  abundanceCap: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  segmentColor: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      abundance: PropTypes.number,
      known: PropTypes.bool,
      readout: PropTypes.string,
    }),
  ).isRequired,
  sort: PropTypes.bool.isRequired,
};

export default SegmentContainer;
