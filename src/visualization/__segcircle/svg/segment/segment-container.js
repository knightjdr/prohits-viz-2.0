import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import calculateRadii from './calculate-radii';
import colorGradient from '../../../color/color-gradient';
import createSegments from './segment-slices';
import Segment from './segment';
import setRange from '../../../../helpers/set-range';
import valuesToColor from './values-to-color';

export class SegmentContainer extends Component {
  constructor(props) {
    super(props);
    const {
      abundanceCap,
      color,
      radius,
      readouts,
      thickness,
      values,
    } = this.props;
    this.gradient = colorGradient(color, process.env.REACT_APP_NUM_GRADIENT_COLORS);
    this.range = setRange(0, abundanceCap, 0, process.env.REACT_APP_NUM_GRADIENT_COLORS - 1);
    const radii = calculateRadii(radius, thickness);
    const colorValues = valuesToColor(values, this.gradient, this.range);
    this.state = {
      radii,
      segments: createSegments(colorValues, radii, readouts),
    };
  }
  render() {
    return (
      <Fragment>
        <Segment
          circleIndex={this.props.circleIndex}
          handleMouseEnter={this.props.handleMouseEnter}
          handleMouseLeave={this.props.handleMouseLeave}
          radii={this.state.radii}
          segments={this.state.segments}
        />
      </Fragment>
    );
  }
}

SegmentContainer.propTypes = {
  abundanceCap: PropTypes.number.isRequired,
  circleIndex: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  radius: PropTypes.number.isRequired,
  readouts: PropTypes.arrayOf(PropTypes.string).isRequired,
  thickness: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SegmentContainer;
