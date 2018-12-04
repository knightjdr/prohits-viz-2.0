import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Switch } from 'antd';

import FieldButton from './field-button';

import './field.css';

const FieldSwitch = ({
  checked,
  field,
  name,
  onChange,
  onClick,
  store,
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
        <Switch
          checked={checked}
          onChange={handleChange}
          {...otherProps}
        />
        <FieldButton
          className="panel__settings-field-button_right"
          hasChanged={store !== checked}
          onClick={handleClick}
          round
        />
      </div>
    </Fragment>
  );
};

FieldSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  field: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  store: PropTypes.bool.isRequired,
};

export default FieldSwitch;
