import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnalysisOptions from './analysis-options';
import { VizAnalysisPropSelector } from '../../../../../state/selectors/analysis/viz-analysis-selector';
import performVizAnalysis from '../../../../../state/post/viz-analysis-thunk';
import { setAnalysisType } from '../../../../../state/set/analysis/viz-analysis-actions';

class AnalysisOptionsContainer extends Component {
  handleType = (type) => {
    this.props.setAnalysisType(type);
  }
  render() {
    return (
      <AnalysisOptions
        handleType={this.handleType}
        performAnalysis={this.props.performVizAnalysis}
        type={this.props.analysis}
      />
    );
  }
}

AnalysisOptionsContainer.defaultProps = {
  analysis: undefined,
};

AnalysisOptionsContainer.propTypes = {
  analysis: PropTypes.string,
  performVizAnalysis: PropTypes.func.isRequired,
  setAnalysisType: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  analysis: VizAnalysisPropSelector(state, 'type'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  performVizAnalysis: () => {
    dispatch(performVizAnalysis());
  },
  setAnalysisType: (analysisType) => {
    dispatch(setAnalysisType(analysisType));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnalysisOptionsContainer);

export default ConnectedContainer;
