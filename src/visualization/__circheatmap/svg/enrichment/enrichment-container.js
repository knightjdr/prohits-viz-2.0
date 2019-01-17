import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ArrSort from '../../../../helpers/arr-sort-by-key';
import createSlice from './enrichment-slices';
import Enrichment from './enrichment';

const data = [
  { color: '#ef5350', readouts: 15, term: 'cytoplasm' },
  { color: '#2196f3', readouts: 23, term: 'nucleus' },
];

export class EnrichmentContainer extends Component {
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
      <Enrichment
        radius={this.props.radius}
        slices={this.state.slices}
      />
    );
  }
}

EnrichmentContainer.propTypes = {
  radius: PropTypes.number.isRequired,
};

export default EnrichmentContainer;
