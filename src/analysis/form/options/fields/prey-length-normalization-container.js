import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ArrayShallowEqual from '../../../../helpers/array-shallow-equal';
import PreyLengthNormalization from './prey-length-normalization';
import FilterHeader from '../../header-selection/filter-header';

const recommendedColumns = [
  'preysequencelength',
];

class PreyLengthNormalizationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }
  componentDidMount = () => {
    const {
      change,
      preyLength,
      preyLengthNorm,
      header,
    } = this.props;
    this.setInitialReduxFormState(change, preyLength, preyLengthNorm, header);
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      change,
      header,
    } = nextProps;
    // if preyLengthNorm or header changes, update preyLength
    this.setReduxFormState(change, header);
  }
  setReduxFormState = (change, header) => {
    /* if header changes, update options and change preyLength and preyLengthNorm if
    ** there is a default option */
    if (!ArrayShallowEqual(header, this.props.header)) {
      const preyLengthCol = FilterHeader(recommendedColumns, header);
      if (preyLengthCol.initialValue) {
        change('preyLength', preyLengthCol.initialValue);
      } else {
        change('preyLength', undefined);
        change('preyLengthNorm', false);
      }
      this.setState({ options: preyLengthCol.options });
    }
  }
  setInitialReduxFormState = (change, preyLength, preyLengthNorm, header) => {
    // no matter what, get options for preyLength column
    const preyLengthCol = FilterHeader(recommendedColumns, header);
    this.setState({ options: preyLengthCol.options });
    /* The following logic is to prevent preyLengthNorm from being set
    ** to false when a component remounts after the user has previous set it
    ** to true. */
    if (
      preyLengthNorm &&
      (
        preyLength ||
        preyLengthCol.initialValue
      )
    ) {
      change('preyLengthNorm', true);
    } else {
      change('preyLengthNorm', false);
    }
    // if preyLength is undefined but can be, set it
    if (
      !preyLength &&
      preyLengthCol.initialValue
    ) {
      change('preyLength', preyLengthCol.initialValue);
    }
  }
  render() {
    return (
      <PreyLengthNormalization
        analysisType={this.props.analysisType}
        options={this.state.options}
      />
    );
  }
}

PreyLengthNormalizationContainer.defaultProps = {
  preyLengthNorm: false,
  preyLength: undefined,
  header: [],
};

PreyLengthNormalizationContainer.propTypes = {
  analysisType: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  preyLengthNorm: PropTypes.bool,
  preyLength: PropTypes.string,
  header: PropTypes.arrayOf(PropTypes.string),
};

export default PreyLengthNormalizationContainer;
