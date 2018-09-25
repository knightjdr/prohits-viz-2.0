import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Annotation from './annotation';
import goSelector from '../../../state/selectors/analysis/go-selector';
import { placeAnnotation } from '../../../state/set/visualization/annotation-actions';
import { clearGoAnnotation, setGoAnnotation } from '../../../state/set/analysis/go-actions';

export class AnnotationContainer extends Component {
  handleChange = (e) => {
    this.props.setGoAnnotation(e.target.value);
  }
  handleClick = () => {
    if (this.props.go.annotation) {
      this.props.placeAnnotation(this.props.go.annotation);
    }
  }
  render() {
    return (
      <Annotation
        annotation={this.props.go.annotation}
        clearAnnotation={this.props.clearGoAnnotation}
        handleChange={this.handleChange}
        handleClick={this.handleClick}
      />
    );
  }
}

AnnotationContainer.propTypes = {
  clearGoAnnotation: PropTypes.func.isRequired,
  go: PropTypes.shape({
    annotation: PropTypes.string,
  }).isRequired,
  placeAnnotation: PropTypes.func.isRequired,
  setGoAnnotation: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  clearGoAnnotation: () => {
    dispatch(clearGoAnnotation());
  },
  placeAnnotation: (text) => {
    dispatch(placeAnnotation(text));
  },
  setGoAnnotation: (text) => {
    dispatch(setGoAnnotation(text));
  },
});

/* istanbul ignore next */
const mapStateToProps = state => ({
  go: goSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationContainer);

export default ConnectedContainer;
