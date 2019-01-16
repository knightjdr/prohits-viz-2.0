import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { arrayShallowEqual } from '../../../../helpers/array-shallow-equal';
import ReadoutLengthNormalization from './readout-length-normalization';
import FilterHeader from '../../header-selection/filter-header';

const recommendedColumns = [
  'preysequencelength',
];

class ReadoutLengthNormalizationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }
  componentDidMount = () => {
    const {
      change,
      readoutLength,
      readoutLengthNorm,
      header,
    } = this.props;
    this.setInitialReduxFormState(change, readoutLength, readoutLengthNorm, header);
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      change,
      header,
    } = nextProps;
    // if readoutLengthNorm or header changes, update readoutLength
    this.setReduxFormState(change, header);
  }
  setReduxFormState = (change, header) => {
    /* if header changes, update options and change readoutLength and readoutLengthNorm if
    ** there is a default option */
    if (!arrayShallowEqual(header, this.props.header)) {
      const readoutLengthCol = FilterHeader(recommendedColumns, header);
      if (readoutLengthCol.initialValue) {
        change('readoutLength', readoutLengthCol.initialValue);
      } else {
        change('readoutLength', undefined);
        change('readoutLengthNorm', false);
      }
      this.setState({ options: readoutLengthCol.options });
    }
  }
  setInitialReduxFormState = (change, readoutLength, readoutLengthNorm, header) => {
    // no matter what, get options for readoutLength column
    const readoutLengthCol = FilterHeader(recommendedColumns, header);
    this.setState({ options: readoutLengthCol.options });
    /* The following logic is to prevent readoutLengthNorm from being set
    ** to false when a component remounts after the user has previous set it
    ** to true. */
    if (
      readoutLengthNorm &&
      (
        readoutLength ||
        readoutLengthCol.initialValue
      )
    ) {
      change('readoutLengthNorm', true);
    } else {
      change('readoutLengthNorm', false);
    }
    // if readoutLength is undefined but can be, set it
    if (
      !readoutLength &&
      readoutLengthCol.initialValue
    ) {
      change('readoutLength', readoutLengthCol.initialValue);
    }
  }
  render() {
    return (
      <ReadoutLengthNormalization
        analysisType={this.props.analysisType}
        options={this.state.options}
      />
    );
  }
}

ReadoutLengthNormalizationContainer.defaultProps = {
  readoutLengthNorm: false,
  readoutLength: undefined,
  header: [],
};

ReadoutLengthNormalizationContainer.propTypes = {
  analysisType: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  readoutLengthNorm: PropTypes.bool,
  readoutLength: PropTypes.string,
  header: PropTypes.arrayOf(PropTypes.string),
};

export default ReadoutLengthNormalizationContainer;
