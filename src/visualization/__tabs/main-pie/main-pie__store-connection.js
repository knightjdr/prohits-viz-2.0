import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import panelSelector from '../../../state/selectors/visualization/panel-selector';
import { displaySelector } from '../../../state/selectors/visualization/display-selector';
import { parameterSelectorProp } from '../../../state/selectors/visualization/params-selector';
import { settingSelector } from '../../../state/selectors/visualization/settings-selector';
import { updatePlotPosition } from '../../../state/set/visualization/display-actions';

export const StoreConnection = ({
  display,
  name,
  panel,
  renderProp,
  renderSvg,
  setDims,
  settings,
  updatePlotXY,
  ...otherProps
}) => renderProp({
  ...otherProps,
  display,
  name,
  panel,
  renderProp: renderSvg,
  setDims,
  settings,
  updatePlotXY,
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
  renderProp: PropTypes.func.isRequired,
  renderSvg: PropTypes.func,
  settings: PropTypes.shape({}).isRequired,
  updatePlotXY: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
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
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreConnection);

export default ConnectedContainer;
