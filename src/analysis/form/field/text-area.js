import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faQuestionSquare from '@fortawesome/fontawesome-pro-solid/faQuestionSquare';
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Input } from 'antd';

import InfoModal from './info-modal';

import './field.css';

const { TextArea } = Input;

/* text area wrapped in Ant design's <FormItem>, whose initial state will
** be set from the redux store's 'input' */

const FormItem = Form.Item;

const CustomInput = ({
  helpMessage,
  input,
  label,
  meta,
  onChange,
  placeHolder,
  required,
  rows,
  style,
}) => {
  const { error, touched } = meta;
  const formError = required && touched && error;
  return (
    <div className="CustomField-container">
      <FormItem
        className="CustomField-formItem"
        label={label}
        help={formError ? error : ''}
        validateStatus={formError ? 'error' : ''}
      >
        <TextArea
          defaultValue={input.value || undefined}
          onMouseLeave={(value) => { onChange(value, input); }}
          placeholder={placeHolder}
          rows={rows}
          style={style}
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
  required: false,
  rows: 5,
  style: {},
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
  required: PropTypes.bool,
  rows: PropTypes.number,
  style: PropTypes.shape({}),
};

export default CustomInput;
