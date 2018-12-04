import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import download from '../../../../helpers/download';
import Info from './panel__info';
import plotSelector from '../../../../state/selectors/visualization/plot-selector';
import { segCircleSettingsSelector } from '../../../../state/selectors/visualization/segcircle-settings-selector';
import { settingSelector } from '../../../../state/selectors/visualization/settings-selector';
import { clearFile } from '../../../../state/set/interactive-file-actions';
import { parameterSelector } from '../../../../state/selectors/visualization/params-selector';

export const InfoContainer = ({
  clearCurrentFile,
  history,
  params,
  plot,
  segcircleSettings,
  settings,
}) => {
  const downloadLegend = () => {
    const svg = document.getElementById('legend').outerHTML;
    download(svg, 'legend.svg', 'image/svg+xml');
  };
  const loadNewFile = () => {
    history.replace('/visualization');
    clearCurrentFile();
  };
  return (
    <Info
      downloadLegend={downloadLegend}
      loadNewFile={loadNewFile}
      params={params}
      segcircleSettings={segcircleSettings}
      segments={plot.segments}
      settings={settings}
    />
  );
};

InfoContainer.defaultProps = {
  plot: { segments: [] },
  segcircleSettings: [],
};

InfoContainer.propTypes = {
  clearCurrentFile: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  params: PropTypes.shape({}).isRequired,
  plot: PropTypes.shape({
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }),
  segcircleSettings: PropTypes.arrayOf(
    PropTypes.shape({
      abundanceCap: PropTypes.number,
      color: PropTypes.string,
      minAbundance: PropTypes.number,
    }),
  ),
  settings: PropTypes.shape({}).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  params: parameterSelector(state),
  plot: plotSelector(state),
  segcircleSettings: segCircleSettingsSelector(state),
  settings: settingSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  clearCurrentFile: () => {
    dispatch(clearFile());
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoContainer);

export default withRouter(ConnectedContainer);
