import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import RowsSelector from '../../../state/selectors/visualization/rows-selector';
import Rows from './visualization__heatmap-rows';

export class RowsContainer extends Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }
  render() {
    return (
      <Rows />
    );
  }
}

RowsContainer.propTypes = {
  row: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
    ref: PropTypes.string,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  columns: RowsSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(RowsContainer);

export default ConnectedContainer;
