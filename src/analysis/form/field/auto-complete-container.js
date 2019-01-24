import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CustomAutoComplete from './auto-complete';

class CustomAutoCompleteContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { dataSource, input } = this.props;
    this.state = {
      dataSource,
      value: input.value || undefined,
    };
  }
  onChange = (value) => {
    this.setState({
      value,
    });
  }
  handleSearch = (value) => {
    const { dataSource } = this.props;
    const searchValue = value ? value.toLowerCase() : '';
    this.setState({
      dataSource: !value
        ? dataSource
        : dataSource.filter(item => item.toLowerCase().includes(searchValue)),
    });
  }
  render() {
    const { onChange, ...otherProps } = this.props;
    const { dataSource, value } = this.state;
    return (
      <CustomAutoComplete
        dataSource={dataSource}
        handleSearch={this.handleSearch}
        onChange={this.onChange}
        onSelect={onChange}
        value={value}
        {...otherProps}
      />
    );
  }
}

CustomAutoCompleteContainer.defaultProps = {
  disabled: false,
  helpMessage: null,
  label: null,
  placeHolder: 'Search...',
  style: {},
};

CustomAutoCompleteContainer.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  disabled: PropTypes.bool,
  helpMessage: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ]),
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
    warning: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  style: PropTypes.shape({}),
};

export default CustomAutoCompleteContainer;
