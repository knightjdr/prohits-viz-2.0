import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ArrSort from '../../../../helpers/arr-sort-by-key';
import createSegments from './paths/segment-slices';
import Plot from './segment-svg__plot';

const data = [
  { abundance: 15, color: '#3366ff', readout: 'gene a' },
  { abundance: 23, color: '#0040ff', readout: 'gene b' },
  { abundance: 8, color: '#668cff', readout: 'gene c' },
  { abundance: 100, color: '#000000', readout: 'gene d' },
  { abundance: 55, color: '#000000', readout: 'gene e' },
  { abundance: 33, color: '#002699', readout: 'gene f' },
  { abundance: 2, color: '#ccd9ff', readout: 'gene g' },
  { abundance: 5, color: '#99b3ff', readout: 'gene h' },
];

export class SegmentContainer extends Component {
  constructor(props) {
    super(props);
    const { radius } = this.props;
    const radii = this.calculateRadii(radius);
    const sorted = ArrSort(data, 'abundance', 'des', 'numeric');
    this.state = {
      radii,
      segments: createSegments(sorted, radii),
    };
  }
  calculateRadii = radius => ({
    full: radius,
    segment: Math.floor(radius * 0.8),
    text: Math.floor(radius * 1.05),
  })
  render() {
    return (
      <Plot
        radii={this.state.radii}
        segments={this.state.segments}
      />
    );
  }
}

SegmentContainer.propTypes = {
  radius: PropTypes.number.isRequired,
};

export default SegmentContainer;
