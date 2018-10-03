import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import colorGradient from '../../../color/color-gradient';
import download from '../../../../helpers/download';
import Info from './panel__info';
import { settingSelectorProp } from '../../../../state/selectors/visualization/settings-selector';
import { clearFile } from '../../../../state/set/interactive-file-actions';
import { parameterSelector } from '../../../../state/selectors/visualization/params-selector';

export class InfoContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      legend: {
        abundanceName: this.props.params.abundanceColumn,
        gradientEdge: colorGradient(this.props.edgeColor, 101, this.props.invertColor),
        gradientFill: colorGradient(this.props.fillColor, 101, this.props.invertColor),
        abundanceCap: this.props.abundanceCap,
        minAbundance: this.props.minAbundance,
        primaryFilter: this.props.primaryFilter,
        scoreName: this.props.params.scoreColumn,
        scoreType: this.props.params.scoreType,
        secondaryFilter: this.props.secondaryFilter,
        imageType: this.props.imageType,
      },
    };
  }
  downloadLegend = () => {
    const svg = document.getElementById('legend').outerHTML;
    download(svg, 'legend.svg', 'image/svg+xml');
  }
  loadNewFile = () => {
    this.props.clearFile();
  }
  render() {
    return (
      <Info
        downloadLegend={this.downloadLegend}
        legend={this.state.legend}
        loadNewFile={this.loadNewFile}
        params={this.props.params}
      />
    );
  }
}

InfoContainer.propTypes = {
  abundanceCap: PropTypes.number.isRequired,
  clearFile: PropTypes.func.isRequired,
  edgeColor: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
  imageType: PropTypes.string.isRequired,
  invertColor: PropTypes.bool.isRequired,
  minAbundance: PropTypes.number.isRequired,
  params: PropTypes.shape({
    abundanceColumn: PropTypes.string,
    scoreColumn: PropTypes.string,
    scoreType: PropTypes.string,
  }).isRequired,
  primaryFilter: PropTypes.number.isRequired,
  secondaryFilter: PropTypes.number.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  abundanceCap: settingSelectorProp(state, 'abundanceCap'),
  edgeColor: settingSelectorProp(state, 'edgeColor'),
  fillColor: settingSelectorProp(state, 'fillColor'),
  imageType: settingSelectorProp(state, 'imageType'),
  invertColor: settingSelectorProp(state, 'invertColor'),
  minAbundance: settingSelectorProp(state, 'minAbundance'),
  params: parameterSelector(state),
  primaryFilter: settingSelectorProp(state, 'primaryFilter'),
  secondaryFilter: settingSelectorProp(state, 'secondaryFilter'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  clearFile: () => {
    dispatch(clearFile());
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoContainer);

export default ConnectedContainer;
