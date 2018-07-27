import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Settings from './panel__settings';
import SettingResetSelector from '../../../../state/selectors/visualization/settings-reset-selector';
import SettingSelector from '../../../../state/selectors/visualization/settings-selector';
import { resetSettings, updateSetting } from '../../../../state/set/visualization/settings-actions';
import { sortDefault } from '../../../../state/set/visualization/rows-actions';

export class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Store input settings (not necessarily insync with store).
      settings: {
        abundanceCap: this.props.abundanceCap,
        cellSize: this.props.cellSize,
        edgeColor: this.props.edgeColor,
        fillColor: this.props.fillColor,
        imageType: this.props.imageType,
        invertColor: this.props.invertColor,
        minAbundance: this.props.minAbundance,
        primaryFilter: this.props.primaryFilter,
        secondaryFilter: this.props.secondaryFilter,
      },
      // Store settings. Use this to determine in UI if state matches store.
      storeSettings: {
        abundanceCap: this.props.abundanceCap,
        cellSize: this.props.cellSize,
        edgeColor: this.props.edgeColor,
        fillColor: this.props.fillColor,
        imageType: this.props.imageType,
        invertColor: this.props.invertColor,
        minAbundance: this.props.minAbundance,
        primaryFilter: this.props.primaryFilter,
        secondaryFilter: this.props.secondaryFilter,
      },
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
  restoreAllSettings = (nextProps, settings, storeSettings) => {
    // Find settings that have changed.
    const updateSettings = Object.keys(settings).filter(prop => (
      settings[prop] !== nextProps[prop]
    ));
    // Find store settings that have changed.
    const updateStoreSettings = Object.keys(storeSettings).filter(prop => (
      storeSettings[prop] !== nextProps[prop]
    ));
    // Create object of new changes and merge with state.
    const newSettings = updateSettings.reduce(((obj, setting) => {
      const newPair = {};
      newPair[setting] = nextProps[setting];
      return { ...obj, ...newPair };
    }), {});
    const newStoreSettings = updateStoreSettings.reduce(((obj, setting) => {
      const newPair = {};
      newPair[setting] = nextProps[setting];
      return { ...obj, ...newPair };
    }), {});
    this.setState({
      settings: {
        ...settings,
        ...newSettings,
      },
      storeSettings: {
        ...storeSettings,
        ...newStoreSettings,
      },
    });
  }
  syncStoreSettings = (nextProps, storeSettings) => {
    // Find store settings that have changed.
    const updateStoreSettings = Object.keys(storeSettings).filter(prop => (
      storeSettings[prop] !== nextProps[prop]
    ));
    // If settings have changed, create object of new changes and merge with state.
    if (updateStoreSettings.length > 0) {
      const newSettings = updateStoreSettings.reduce(((obj, setting) => {
        const newPair = {};
        newPair[setting] = nextProps[setting];
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
      this.props.updateSetting(setting, this.state.settings[setting]);
    }
  }
  render() {
    return (
      <Settings
        changeSetting={this.changeSetting}
        settings={this.state.settings}
        resetImage={this.props.sortDefault}
        resetSettings={this.props.resetSettings}
        storeSettings={this.state.storeSettings}
        updateSetting={this.updateSetting}
      />
    );
  }
}

SettingsContainer.propTypes = {
  abundanceCap: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  edgeColor: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
  imageType: PropTypes.string.isRequired,
  invertColor: PropTypes.bool.isRequired,
  minAbundance: PropTypes.number.isRequired,
  primaryFilter: PropTypes.number.isRequired,
  reset: PropTypes.bool.isRequired,
  resetSettings: PropTypes.func.isRequired,
  secondaryFilter: PropTypes.number.isRequired,
  sortDefault: PropTypes.func.isRequired,
  updateSetting: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  abundanceCap: SettingSelector(state, 'abundanceCap'),
  cellSize: SettingSelector(state, 'cellSize'),
  edgeColor: SettingSelector(state, 'edgeColor'),
  fillColor: SettingSelector(state, 'fillColor'),
  imageType: SettingSelector(state, 'imageType'),
  invertColor: SettingSelector(state, 'invertColor'),
  minAbundance: SettingSelector(state, 'minAbundance'),
  primaryFilter: SettingSelector(state, 'primaryFilter'),
  reset: SettingResetSelector(state),
  secondaryFilter: SettingSelector(state, 'secondaryFilter'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  resetSettings: () => {
    dispatch(resetSettings());
  },
  sortDefault: () => {
    dispatch(sortDefault());
  },
  updateSetting: (setting, value) => {
    dispatch(updateSetting(setting, value));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsContainer);

export default ConnectedContainer;
