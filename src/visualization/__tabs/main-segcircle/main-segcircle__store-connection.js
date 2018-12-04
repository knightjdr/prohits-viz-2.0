import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import panelSelector from '../../../state/selectors/visualization/panel-selector';
import plotSelector from '../../../state/selectors/visualization/plot-selector';
import { displaySelector } from '../../../state/selectors/visualization/display-selector';
import { parameterSelectorProp } from '../../../state/selectors/visualization/params-selector';
import { segCircleSettingsSelector } from '../../../state/selectors/visualization/segcircle-settings-selector';
import { settingSelector } from '../../../state/selectors/visualization/settings-selector';
import { updatePlotPosition } from '../../../state/set/visualization/display-actions';
import { updateSetting } from '../../../state/set/visualization/settings-actions';

export const StoreConnection = ({
  display,
  name,
  panel,
  plot,
  renderProp,
  renderSvg,
  setDims,
  settings,
  updatePlotXY,
  updateSettingValue,
  ...otherProps
}) => renderProp({
  ...otherProps,
  display,
  name,
  panel,
  plot,
  renderProp: renderSvg,
  setDims,
  settings,
  updatePlotXY,
  updateSettingValue,
});

StoreConnection.defaultProps = {
  renderSvg: null,
};

StoreConnection.propTypes = {
  display: PropTypes.shape({
    plotFixed: PropTypes.bool,
    plotTranslate: PropTypes.number,
  }).isRequired,
  name: PropTypes.string,
  panel: PropTypes.bool.isRequired,
  plot: PropTypes.shape({
    readouts: PropTypes.arrayOf(
      PropTypes.shape({
        known: PropTypes.bool,
        readout: PropTypes.string,
      }),
    ),
    order: PropTypes.arrayOf(PropTypes.number),
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.number),
      }),
    ),
  }).isRequired,
  renderProp: PropTypes.func.isRequired,
  renderSvg: PropTypes.func,
  segcircleSettings: PropTypes.arrayOf(
    PropTypes.shape({
      abundanceCap: PropTypes.number,
      color: PropTypes.string,
      minAbundance: PropTypes.number,
    }),
  ).isRequired,
  settings: PropTypes.shape({
    thickness: PropTypes.number,
  }).isRequired,
  updatePlotXY: PropTypes.func.isRequired,
  updateSettingValue: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  display: displaySelector(state),
  name: parameterSelectorProp(state, 'name'),
  panel: panelSelector(state),
  plot: plotSelector(state),
  segcircleSettings: segCircleSettingsSelector(state),
  settings: settingSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  updatePlotXY: (fixed, translate) => {
    dispatch(updatePlotPosition(fixed, translate));
  },
  updateSettingValue: (setting, value) => {
    dispatch(updateSetting(setting, value));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreConnection);

export default ConnectedContainer;
