import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { arrayShallowEqual } from '../../../../helpers/array-shallow-equal';
import OtherAbundanceColumns from './other-abundance-columns';
import sort from '../../../../helpers/sort-array-strings';

class OtherAbundanceColumnsContainer extends Component {
  constructor(props) {
    super(props);
    const { abundance, header } = this.props;
    this.state = {
      options: this.defineOptions(abundance, header),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      abundance,
      change,
      header,
    } = nextProps;
    this.setReduxFormState(change, abundance, header);
  }
  setReduxFormState = (change, abundance, header) => {
    if (!arrayShallowEqual(header, this.props.header)) {
      /* If header changes, clear options */
      this.defineOptions(abundance, header, false);
    } else if (
      abundance !== this.props.abundance
      && this.props.otherAbundance.includes(abundance)
    ) {
      /* If abudance column changes, update otherAbundance options to remove it if selected,
      ** and update available options */
      this.defineOptions(abundance, header, false);
      const index = this.props.otherAbundance.findIndex(abundance);
      const newSelections = this.props.otherAbundance;
      newSelections.splice(index, 1);
      this.props.change('otherAbundance', newSelections);
    }
  }
  defineOptions = (abundance, header, shouldReturn = true) => {
    const columns = abundance ? header.filter(col => col !== abundance) : header;
    sort(columns);
    const options = columns.map(column => ({
      text: column,
      value: column,
    }));
    if (!shouldReturn) {
      this.setState({ options });
    }
    return options;
  }
  render() {
    return (
      <OtherAbundanceColumns options={this.state.options} />
    );
  }
}

OtherAbundanceColumnsContainer.defaultProps = {
  abundance: '',
  header: [],
  otherAbundance: [],
};

OtherAbundanceColumnsContainer.propTypes = {
  abundance: PropTypes.string,
  change: PropTypes.func.isRequired,
  header: PropTypes.arrayOf(PropTypes.string),
  otherAbundance: PropTypes.arrayOf(PropTypes.string),
};

export default OtherAbundanceColumnsContainer;
