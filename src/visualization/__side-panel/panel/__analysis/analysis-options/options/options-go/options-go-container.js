import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Go from './options-go';
import { VizFormPropSelector } from '../../../../../../../state/selectors/analysis/viz-analysis-form-selector';
import { setGoParameters } from '../../../../../../../state/set/analysis/viz-analysis-form-actions';

export class GoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvanced: false,
    };
  }
  handleGoCheckbox = () => {
    const goSetting = {
      sf_GO: !this.props.form.sf_GO,
      'sf_GO:BP': !this.props.form.sf_GO,
      'sf_GO:CC': !this.props.form.sf_GO,
      'sf_GO:MF': !this.props.form.sf_GO,
    };
    this.props.setGoParameters(goSetting);
  }
  handleCheckbox = (field) => {
    const setting = {};
    setting[field] = !this.props.form[field];
    this.props.setGoParameters(setting);
  }
  handleInput = (field, value) => {
    const setting = {};
    setting[field] = value;
    this.props.setGoParameters(setting);
  }
  handleSelect = (field, value) => {
    const setting = {};
    setting[field] = value;
    this.props.setGoParameters(setting);
  }
  toggleAdvanced = () => {
    this.setState(({ showAdvanced }) => ({
      showAdvanced: !showAdvanced,
    }));
  }
  render() {
    return (
      <Go
        form={this.props.form}
        handleCheckbox={this.handleCheckbox}
        handleGoCheckbox={this.handleGoCheckbox}
        handleInput={this.handleInput}
        handleSelect={this.handleSelect}
        showAdvanced={this.state.showAdvanced}
        toggleAdvanced={this.toggleAdvanced}
      />
    );
  }
}

GoContainer.propTypes = {
  form: PropTypes.shape({
    sf_GO: PropTypes.bool,
  }).isRequired,
  setGoParameters: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  form: VizFormPropSelector(state, 'go'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  setGoParameters: (parameter, value) => {
    dispatch(setGoParameters(parameter, value));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoContainer);

export default ConnectedContainer;
