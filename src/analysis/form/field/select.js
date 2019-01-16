import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Select } from 'antd';
import { faQuestionSquare } from '@fortawesome/pro-solid-svg-icons';

import InfoModal from './info-modal';

import './field.css';

/* select menu wrapped in Ant design's <FormItem>, whose initial state will
** be set from the redux store's 'input' */

const FormItem = Form.Item;
const { OptGroup, Option } = Select;

const CustomSelect = ({
  allowClear,
  helpMessage,
  input,
  label,
  meta,
  multiple,
  onChange,
  options,
  placeHolder,
  style,
}) => {
  const { error, touched } = meta;
  const formError = touched && error;
  const change = (value) => {
    onChange(value, input);
  };
  const openModal = () => {
    InfoModal(label || 'Help', helpMessage);
  };
  return (
    <div className="CustomField-container">
      <FormItem
        className="CustomField-formItem"
        label={label}
        help={formError ? error : ''}
        validateStatus={formError ? 'error' : ''}
      >
        <Select
          allowClear={allowClear}
          autoClearSearchValue={false}
          mode={multiple ? 'multiple' : 'default'}
          onChange={change}
          placeholder={placeHolder}
          style={style}
          value={input.value || undefined}
        >
          {
            options.map((option) => {
              // group options if passed group object with children
              if (option.group) {
                return (
                  <OptGroup
                    key={option.text}
                    label={option.text}
                  >
                    {
                      option.children.map(child => (
                        <Option
                          disabled={child.disabled}
                          key={child.value}
                          value={child.value}
                        >
                          { child.text }
                        </Option>
                      ))
                    }
                  </OptGroup>
                );
              }
              // return individual options
              return (
                <Option
                  disabled={option.disabled}
                  key={option.value}
                  value={option.value}
                >
                  { option.text }
                </Option>
              );
            })
          }
        </Select>
      </FormItem>
      {
        helpMessage &&
        <FontAwesomeIcon
          className="customfield__help"
          icon={faQuestionSquare}
          onClick={openModal}
          size="2x"
        />
      }
    </div>
  );
};

CustomSelect.defaultProps = {
  allowClear: false,
  helpMessage: null,
  label: null,
  multiple: false,
  options: [],
  placeHolder: 'Select',
  style: {},
};

CustomSelect.propTypes = {
  allowClear: PropTypes.bool,
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
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(
        PropTypes.shape({}),
      ),
      disabled: PropTypes.bool,
      group: PropTypes.bool,
      text: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  ),
  placeHolder: PropTypes.string,
  style: PropTypes.shape({}),
};

export default CustomSelect;
