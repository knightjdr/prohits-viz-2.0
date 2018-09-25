import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Columns from './columns';
import convertToCsv from '../../../helpers/convert-to-csv';
import download from '../../../helpers/download';
import formatRows from './format-rows';
import Go from './go';
import { VizAnalysisPropSelector } from '../../../state/selectors/analysis/viz-analysis-selector';

export class GoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: formatRows(this.props.go.results),
    };
  }
  handleExport = () => {
    const header = Columns.header.map(item => item.name);
    const csv = convertToCsv(header, Columns.order, this.props.go.results.terms, '\t');
    download(csv, 'go-results.txt', 'text/tab-separated-values');
  }
  render() {
    return (
      <Go
        didFail={this.props.go.didFail}
        handleExport={this.handleExport}
        isRunning={this.props.go.isRunning}
        results={this.state.results}
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
