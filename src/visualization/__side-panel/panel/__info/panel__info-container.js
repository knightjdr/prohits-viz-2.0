import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ColorGradient from '../../../color/color-gradient';
import Download from '../../download/download';
import Info from './panel__info';
import ParamSelector from '../../../../state/selectors/visualization/params-selector';
import SettingSelector from '../../../../state/selectors/visualization/settings-selector';
import { clearFile } from '../../../../state/set/interactive-file-actions';

export class InfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legend: {
        abundanceName: this.props.params.abundanceColumn,
        gradientEdge: ColorGradient(this.props.edgeColor, 101, this.props.invertColor),
        gradientFill: ColorGradient(this.props.fillColor, 101, this.props.invertColor),
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
    Download(svg, 'legend.svg', 'image/svg+xml');
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
  abundanceCap: SettingSelector(state, 'abundanceCap'),
  edgeColor: SettingSelector(state, 'edgeColor'),
  fillColor: SettingSelector(state, 'fillColor'),
  imageType: SettingSelector(state, 'imageType'),
  invertColor: SettingSelector(state, 'invertColor'),
  minAbundance: SettingSelector(state, 'minAbundance'),
  params: ParamSelector(state),
  primaryFilter: SettingSelector(state, 'primaryFilter'),
  secondaryFilter: SettingSelector(state, 'secondaryFilter'),
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
