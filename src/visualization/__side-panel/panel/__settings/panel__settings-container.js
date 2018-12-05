import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Settings from './panel__settings';
import SettingResetSelector from '../../../../state/selectors/visualization/settings-reset-selector';
import { availablePlotsSelector } from '../../../../state/selectors/visualization/available-plots-selector';
import { changePlot } from '../../../../state/set/visualization/plot-actions';
import { parameterSelectorProp } from '../../../../state/selectors/visualization/params-selector';
import { settingSelector } from '../../../../state/selectors/visualization/settings-selector';
import { resetSettings, updateSetting } from '../../../../state/set/visualization/settings-actions';

export class SettingsContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { settings } = this.props;
    this.state = {
      // Store input settings (not necessarily insync with store).
      settings: { ...settings },
      // Store settings. Use this to determine in UI if state matches store.
      storeSettings: { ...settings },
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.reset) {
      this.restoreAllSettings(nextProps, this.state.settings, this.state.storeSettings);
    } else {
      this.syncStoreSettings(nextProps, this.state.storeSettings);
    }
  }
  changeSetting = (setting, value) => {
    const newState = {};
    newState[setting] = value;
    this.setState(({ settings }) => ({
      settings: {
        ...settings,
        ...newState,
      },
    }));
  }
  restoreAllSettings = ({ settings }, current, storeSettings) => {
    // Find settings that have changed.
    const updateSettings = Object.keys(current).filter(prop => (
      current[prop] !== settings[prop]
    ));
    // Find store settings that have changed.
    const updateStoreSettings = Object.keys(storeSettings).filter(prop => (
      storeSettings[prop] !== settings[prop]
    ));
    // Create object of new changes and merge with state.
    const newSettings = updateSettings.reduce(((obj, setting) => {
      const newPair = {};
      newPair[setting] = settings[setting];
      return { ...obj, ...newPair };
    }), {});
    const newStoreSettings = updateStoreSettings.reduce(((obj, setting) => {
      const newPair = {};
      newPair[setting] = settings[setting];
      return { ...obj, ...newPair };
    }), {});
    this.setState({
      settings: {
        ...current,
        ...newSettings,
      },
      storeSettings: {
        ...storeSettings,
        ...newStoreSettings,
      },
    });
  }
  syncStoreSettings = ({ settings }, storeSettings) => {
    // Find store settings that have changed.
    const updateStoreSettings = Object.keys(storeSettings).filter(prop => (
      storeSettings[prop] !== settings[prop]
    ));
    // If settings have changed, create object of new changes and merge with state.
    if (updateStoreSettings.length > 0) {
      const newSettings = updateStoreSettings.reduce(((obj, setting) => {
        const newPair = {};
        newPair[setting] = settings[setting];
        return { ...obj, ...newPair };
      }), {});
      this.setState({
        storeSettings: {
          ...storeSettings,
          ...newSettings,
        },
      });
    }
  }
  updateSetting = (setting) => {
    if (this.state.settings[setting] !== this.state.storeSettings[setting]) {
      this.props.update(setting, this.state.settings[setting]);
    }
  }
  render() {
    return (
      <Settings
        changeSetting={this.changeSetting}
        imageKind={this.props.imageKind}
        changePlot={this.props.changePlot}
        plots={this.props.plots}
        resetSettings={this.props.resetAll}
        settings={this.state.settings}
        storeSettings={this.state.storeSettings}
        updateSetting={this.updateSetting}
      />
    );
  }
}

SettingsContainer.propTypes = {
  changePlot: PropTypes.func.isRequired,
  imageKind: PropTypes.string.isRequired,
  plots: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  reset: PropTypes.bool.isRequired,
  resetAll: PropTypes.func.isRequired,
  settings: PropTypes.shape({}).isRequired,
  update: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  imageKind: parameterSelectorProp(state, 'imageType'),
  plots: availablePlotsSelector(state),
  reset: SettingResetSelector(state),
  settings: settingSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  changePlot: (plot) => {
    dispatch(changePlot(plot));
  },
  resetAll: () => {
    dispatch(resetSettings());
  },
  update: (setting, value) => {
    dispatch(updateSetting(setting, value));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsContainer);

export default ConnectedContainer;
