import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Go from './visualization__go';
import { VizAnalysisPropSelector } from '../../../state/selectors/analysis/viz-analysis-selector';

class GoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Go
        didFail={this.props.go.didFail}
        isRunning={this.props.go.isRunning}
        results={this.props.go.results}
      />
    );
  }
}

GoContainer.propTypes = {
  go: PropTypes.shape({
    didFail: PropTypes.bool,
    isRunning: PropTypes.bool,
    results: PropTypes.shape({
      noResults: PropTypes.bool,
      terms: PropTypes.arrayOf(
        PropTypes.shape,
      ),
      warnings: PropTypes.arrayOf(
        PropTypes.string,
      ),
    }),
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  go: VizAnalysisPropSelector(state, 'go'),
});


const ConnectedContainer = connect(
  mapStateToProps,
)(GoContainer);

export default ConnectedContainer;
