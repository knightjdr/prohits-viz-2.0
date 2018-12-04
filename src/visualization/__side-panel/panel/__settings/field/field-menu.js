import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Select } from 'antd';

import FieldButton from './field-button';

const { Option } = Select;

const Menu = ({
  field,
  name,
  onChange,
  onClick,
  options,
  store,
  value,
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
        <Select
          onChange={handleChange}
          value={value}
        >
          {
            options.map(option => (
              <Option
                key={option.value}
                value={option.value}
              >
                {option.text}
              </Option>
            ))
          }
        </Select>
        <FieldButton
          hasChanged={store !== value}
          onClick={handleClick}
        />
      </div>
    </Fragment>
  );
};

Menu.propTypes = {
  field: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  ).isRequired,
  store: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default Menu;
