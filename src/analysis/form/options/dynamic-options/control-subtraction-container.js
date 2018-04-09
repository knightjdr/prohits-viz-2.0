import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ArrayShallowEqual from '../../../../helpers/array-shallow-equal';
import ControlSubtraction from './control-subtraction';

const expectedControlCol = (headers) => {
  // make headers lower case for comparison with recommended values
  const lowercaseHeader = headers.map(header => (header.toLowerCase()));
  const acceptableColumns = [
    'ctrlcounts',
    'ctrlintensity',
    'avgctrlintensity',
    'user controls (spc or intensities)',
    'crap controls (spc)',
    'crap controls (int)',
  ];
  for (let i = 0, iLen = acceptableColumns.length; i < iLen; i += 1) {
    const headerIndex = lowercaseHeader.indexOf(acceptableColumns[i]);
    if (headerIndex > -1) {
      return headers[headerIndex];
    }
  }
  return undefined;
};

class ControlSubtractionContainer extends Component {
  constructor(props) {
    super(props);
    const {
      change,
      ctrlSub,
      control,
      header,
    } = this.props;
    this.setInitialReduxFormState(change, ctrlSub, control, header);
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      change,
      ctrlSub,
      header,
    } = nextProps;
    // if header or ctrlSub changes, update control
    if (ctrlSub !== this.props.ctrlSub) {
      change('control', ctrlSub ? expectedControlCol(header) : undefined);
    } else if (!ArrayShallowEqual(header, this.props.header)) {
      change('control', expectedControlCol(header));
    }
  }
  setInitialReduxFormState = (change, ctrlSub, control, header) => {
    if (
      !control &&
      ctrlSub
    ) {
      change('control', expectedControlCol(header));
    }
  }
  render() {
    return (
      <ControlSubtraction analysisType={this.props.analysisType} />
    );
  }
}

ControlSubtractionContainer.defaultProps = {
  ctrlSub: false,
  control: undefined,
  header: [],
};

ControlSubtractionContainer.propTypes = {
  analysisType: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  ctrlSub: PropTypes.bool,
  control: PropTypes.string,
  header: PropTypes.arrayOf(PropTypes.string),
};

export default ControlSubtractionContainer;
