import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { InputNumber } from 'antd';

import FieldButton from './field-button';

const Input = ({
  field,
  name,
  onChange,
  onClick,
  store,
  value,
  ...otherProps
}) => {
  const handleChange = (newValue) => {
    onChange(field, newValue);
  };
  const handleClick = () => {
    onClick(field);
  };
  return (
    <Fragment>
      <div>
        {name}
      </div>
      <div>
        <InputNumber
          onChange={handleChange}
          value={value}
          {...otherProps}
        />
        <FieldButton
          hasChanged={store !== value}
          onClick={handleClick}
        />
      </div>
    </Fragment>
  );
};

Input.propTypes = {
  field: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  store: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default Input;
