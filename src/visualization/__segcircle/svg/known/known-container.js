import PropTypes from 'prop-types';
import React, { Component } from 'react';

import createKnown from './known-slice';
import Known from './known';

export class KnownContainer extends Component {
  constructor(props) {
    super(props);
    const {
      radius,
      readouts,
    } = this.props;
    this.state = {
      end: createKnown(readouts, radius),
    };
  }
  render() {
    return (
      <Known
        end={this.state.end}
        radius={this.props.radius}
      />
    );
  }
}

KnownContainer.propTypes = {
  radius: PropTypes.number.isRequired,
  readouts: PropTypes.arrayOf(
    PropTypes.shape({
      known: PropTypes.bool,
    }),
  ).isRequired,
};

export default KnownContainer;
