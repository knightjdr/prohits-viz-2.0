import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnalysisOptions from './analysis-options';
import { customizeImage } from '../../../../../state/set/analysis/customize/data-actions';
import performVizAnalysis from '../../../../../state/post/viz-analysis-thunk';
import { setAnalysisType } from '../../../../../state/set/analysis/viz-analysis-actions';
import { VizAnalysisPropSelector } from '../../../../../state/selectors/analysis/viz-analysis-selector';

export class AnalysisOptionsContainer extends Component {
  handleType = (type) => {
    this.props.setAnalysisType(type);
  }
  performAnalysis = () => {
    const { analysis, customizeSelection, performAnalysis } = this.props;
    if (analysis === 'customize') {
      customizeSelection();
    } else if (analysis) {
      performAnalysis();
    }
  }
  render() {
    return (
      <AnalysisOptions
        handleType={this.handleType}
        performAnalysis={this.performAnalysis}
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
  customizeSelection: PropTypes.func.isRequired,
  performAnalysis: PropTypes.func.isRequired,
  setAnalysisType: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  analysis: VizAnalysisPropSelector(state, 'type'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  customizeSelection: () => {
    dispatch(customizeImage());
  },
  performAnalysis: () => {
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
