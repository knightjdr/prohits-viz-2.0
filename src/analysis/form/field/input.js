import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Input } from 'antd';
import { faQuestionSquare } from '@fortawesome/pro-solid-svg-icons';

import InfoModal from './info-modal';
import UndefinedIfNotSet from '../../../helpers/undefined-if-not-set';

import './field.css';

/* input menu wrapped in Ant design's <FormItem>, whose initial state will
** be set from the redux store's 'input' */

const FormItem = Form.Item;

const CustomInput = ({
  helpMessage,
  input,
  label,
  meta,
  onChange,
  placeHolder,
  style,
  type,
}) => {
  const { error, touched } = meta;
  const formError = touched && error;
  // the next condition is to allow input values of 0
  const defaultValue = UndefinedIfNotSet(input.value);
  return (
    <div className="CustomField-container">
      <FormItem
        className="CustomField-formItem"
        label={label}
        help={formError ? error : ''}
        validateStatus={formError ? 'error' : ''}
      >
        <Input
          defaultValue={defaultValue}
          onMouseLeave={(e) => {
            // if user changed input then update
            if (e.target.value !== input.value) {
              onChange(e.target.value, input);
            }
          }}
          onPressEnter={(e) => { onChange(e.target.value, input); }}
          placeholder={placeHolder}
          style={style}
          type={type}
        />
      </FormItem>
      {
        helpMessage &&
        <FontAwesomeIcon
          className="CustomField-help"
          icon={faQuestionSquare}
          onClick={() => { InfoModal(label || 'Help', helpMessage); }}
          size="2x"
        />
      }
    </div>
  );
};

CustomInput.defaultProps = {
  helpMessage: null,
  label: null,
  placeHolder: 'Select',
  style: {},
  type: 'text',
};

CustomInput.propTypes = {
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
  type: PropTypes.string,
};

export default CustomInput;
