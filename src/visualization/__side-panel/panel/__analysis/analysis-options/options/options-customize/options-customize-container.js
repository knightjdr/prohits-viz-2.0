import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Customize from './options-customize';
import { customizeDataSelector } from '../../../../../../../state/selectors/analysis/customize/data-selector';
import { setCustomizeParameters } from '../../../../../../../state/set/analysis/viz-analysis-form-actions';
import { VizFormPropSelector } from '../../../../../../../state/selectors/analysis/viz-analysis-form-selector';
import { undoCustomizeState, updateImage } from '../../../../../../../state/set/analysis/customize/data-actions';

export class CustomizeContainer extends Component {
  constructor(props) {
    super(props);
    const { customize } = this.props;
    this.newestIndex = this.getIndex(customize);
    this.state = {
      undoDisabled: this.shouldUndoBeDisabled(customize),
      updateDisabled: this.shouldUpdateBeDisabled(customize),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { customize } = nextProps;
    this.newestIndex = this.getIndex(customize);
    this.setState({
      undoDisabled: this.shouldUndoBeDisabled(customize),
      updateDisabled: this.shouldUpdateBeDisabled(customize),
    });
  }
  getIndex = customize => (
    customize.length > 0 ? customize.length - 1 : 0
  )
  handleCheckbox = (field) => {
    const setting = {};
    setting[field] = !this.props.form[field];
    this.props.setCustomizeParameters(setting);
  }
  shouldUndoBeDisabled = currentState => (
    currentState === undefined || currentState.length < 2
  )
  shouldUpdateBeDisabled = currentState => (
    currentState === undefined || currentState.length < 1
  )
  undo = () => {
    if (!this.state.undoDisabled) {
      this.props.undo();
    }
  }
  updateImage = () => {
    const { customize, form } = this.props;
    this.props.updateImage(
      customize[this.newestIndex],
      form.removeEmpty,
      form.resetMaximums,
    );
  }
  render() {
    return (
      <Customize
        form={this.props.form}
        handleCheckbox={this.handleCheckbox}
        handleSelect={this.handleSelect}
        undo={this.undo}
        undoDisabled={this.state.undoDisabled}
        updateDisabled={this.state.updateDisabled}
        updateImage={this.updateImage}
      />
    );
  }
}

CustomizeContainer.propTypes = {
  customize: PropTypes.arrayOf(
    PropTypes.shape({
      columns: PropTypes.shape({}),
    }),
  ).isRequired,
  form: PropTypes.shape({
    deleteRC: PropTypes.bool,
    reorder: PropTypes.bool,
    removeEmpty: PropTypes.bool,
    resetMaximums: PropTypes.bool,
  }).isRequired,
  setCustomizeParameters: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  customize: customizeDataSelector(state),
  form: VizFormPropSelector(state, 'customize'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  setCustomizeParameters: (parameter, value) => {
    dispatch(setCustomizeParameters(parameter, value));
  },
  undo: () => {
    dispatch(undoCustomizeState());
  },
  updateImage: (current, remove, reset, prevRemove, prevReset) => {
    dispatch(updateImage(current, remove, reset, prevRemove, prevReset));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomizeContainer);
