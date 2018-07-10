import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateSetting } from '../../../../state/set/visualization/settings-actions';
import Settings from './panel__settings';
import SettingSelector from '../../../../state/selectors/visualization/settings-selector';

export class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        abundanceCap: this.props.abundanceCap,
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
  changeSetting = (setting, value) => {
    const newState = {};
    newState[setting] = value;
    this.setState(({ settings }) => ({
      settings: Object.assign({}, settings, newState),
    }));
  }
  updateSetting = (setting) => {
    this.props.updateSetting(setting, this.state.settings[setting]);
  }
  render() {
    return (
      <Settings
        changeSetting={this.changeSetting}
        settings={this.state.settings}
        updateSetting={this.updateSetting}
      />
    );
  }
}

SettingsContainer.propTypes = {
  abundanceCap: PropTypes.number.isRequired,
  edgeColor: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
  imageType: PropTypes.string.isRequired,
  invertColor: PropTypes.bool.isRequired,
  minAbundance: PropTypes.number.isRequired,
  primaryFilter: PropTypes.number.isRequired,
  secondaryFilter: PropTypes.number.isRequired,
  updateSetting: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  abundanceCap: SettingSelector(state, 'abundanceCap'),
  edgeColor: SettingSelector(state, 'edgeColor'),
  fillColor: SettingSelector(state, 'fillColor'),
  imageType: SettingSelector(state, 'imageType'),
  invertColor: SettingSelector(state, 'invertColor'),
  minAbundance: SettingSelector(state, 'minAbundance'),
  primaryFilter: SettingSelector(state, 'primaryFilter'),
  secondaryFilter: SettingSelector(state, 'secondaryFilter'),
});

const mapDispatchToProps = dispatch => ({
  updateSetting: (setting, value) => {
    dispatch(updateSetting(setting, value));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsContainer);

export default ConnectedContainer;
