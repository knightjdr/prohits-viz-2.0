import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ArrSort from '../../../../helpers/arr-sort-by-key';
import createSlice from './paths/pie-slices';
import Pie from './pie-svg__plot';

const data = [
  { color: '#ef5350', readouts: 15, term: 'cytoplasm' },
  { color: '#2196f3', readouts: 23, term: 'nucleus' },
];

export class PieContainer extends Component {
  constructor(props) {
    super(props);
    const { radius } = this.props;
    const sorted = ArrSort(data, 'readouts', 'des', 'numeric');
    this.state = {
      slices: createSlice(sorted, radius),
    };
  }
  render() {
    return (
      <Pie
        radius={this.props.radius}
        slices={this.state.slices}
      />
    );
  }
}

PieContainer.propTypes = {
  radius: PropTypes.number.isRequired,
};

export default PieContainer;
