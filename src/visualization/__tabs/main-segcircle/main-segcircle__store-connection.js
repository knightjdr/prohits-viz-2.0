import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import panelSelector from '../../../state/selectors/visualization/panel-selector';
import segCirclesSelector from '../../../state/selectors/visualization/segcircles-selector';
import { displaySelector } from '../../../state/selectors/visualization/display-selector';
import { parameterSelectorProp } from '../../../state/selectors/visualization/params-selector';
import { settingSelector } from '../../../state/selectors/visualization/settings-selector';
import { updatePlotPosition } from '../../../state/set/visualization/display-actions';
import { updateSetting } from '../../../state/set/visualization/settings-actions';

export const StoreConnection = ({
  circles,
  display,
  name,
  panel,
  renderProp,
  renderSvg,
  setDims,
  settings,
  updatePlotXY,
  updateSettingValue,
  ...otherProps
}) => renderProp({
  ...otherProps,
  circles,
  display,
  name,
  panel,
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
  circles: PropTypes.shape({
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
  display: PropTypes.shape({
    plotFixed: PropTypes.bool,
    plotTranslate: PropTypes.number,
  }).isRequired,
  name: PropTypes.string,
  panel: PropTypes.bool.isRequired,
  renderProp: PropTypes.func.isRequired,
  renderSvg: PropTypes.func,
  settings: PropTypes.shape({
    thickness: PropTypes.number,
  }).isRequired,
  updatePlotXY: PropTypes.func.isRequired,
  updateSettingValue: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  circles: segCirclesSelector(state),
  display: displaySelector(state),
  name: parameterSelectorProp(state, 'name'),
  panel: panelSelector(state),
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
