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
    const {
      helpMessage,
      input,
      label,
      meta,
      onChange,
      placeHolder,
      style,
    } = this.props;
    const { dataSource, value } = this.state;
    return (
      <CustomAutoComplete
        dataSource={dataSource}
        handleSearch={this.handleSearch}
        helpMessage={helpMessage}
        input={input}
        label={label}
        meta={meta}
        onChange={this.onChange}
        onSelect={onChange}
        placeHolder={placeHolder}
        style={style}
        value={value}
      />
    );
  }
}

CustomAutoCompleteContainer.defaultProps = {
  helpMessage: null,
  label: null,
  placeHolder: 'Search...',
  style: {},
};

CustomAutoCompleteContainer.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  helpMessage: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ]),
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
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
