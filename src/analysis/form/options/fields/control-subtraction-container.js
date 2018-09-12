import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { arrayShallowEqual } from '../../../../helpers/array-shallow-equal';
import ControlSubtraction from './control-subtraction';
import FilterHeader from '../../header-selection/filter-header';

const recommendedColumns = [
  'ctrlcounts',
  'ctrlintensity',
  'avgctrlintensity',
  'user controls (spc or intensities)',
  'crap controls (spc)',
  'crap controls (int)',
];

class ControlSubtractionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }
  componentDidMount = () => {
    const {
      change,
      control,
      ctrlSub,
      header,
    } = this.props;
    this.setInitialReduxFormState(change, control, ctrlSub, header);
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      change,
      header,
    } = nextProps;
    // if ctrlSub or header changes, update control
    this.setReduxFormState(change, header);
  }
  setReduxFormState = (change, header) => {
    /* if header changes, update options and change control and ctrlSub if
    ** there is a default option */
    if (!arrayShallowEqual(header, this.props.header)) {
      const controlCol = FilterHeader(recommendedColumns, header);
      if (controlCol.initialValue) {
        change('control', controlCol.initialValue);
        change('ctrlSub', true);
      } else {
        change('control', undefined);
        change('ctrlSub', false);
      }
      this.setState({ options: controlCol.options });
    }
  }
  setInitialReduxFormState = (change, control, ctrlSub, header) => {
    // no matter what, get options for control column
    const controlCol = FilterHeader(recommendedColumns, header);
    this.setState({ options: controlCol.options });
    /* The following logic is to prevent control subtraction from being set
    ** to true when a component remounts after the user has previous set it
    ** to false. */
    if (
      ctrlSub &&
      (
        control ||
        controlCol.initialValue
      )
    ) {
      change('ctrlSub', true);
    } else {
      change('ctrlSub', false);
    }
    // if control is undefined but can be, set it
    if (
      !control &&
      controlCol.initialValue
    ) {
      change('control', controlCol.initialValue);
    }
  }
  render() {
    return (
      <ControlSubtraction
        analysisType={this.props.analysisType}
        options={this.state.options}
      />
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
