import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Switch } from 'antd';
import { faQuestionSquare } from '@fortawesome/pro-solid-svg-icons';

import InfoModal from './info-modal';

const FormItem = Form.Item;

/* switch box wrapped in Ant design's <FormItem>, whose state will
** be set from the redux store's 'input' */

const CustomSwitch = ({
  formItemLayout,
  helpMessage,
  input,
  label,
  onChange,
  style,
}) => {
  const handleChange = (value) => {
    onChange(value, input);
  };
  const openModal = () => {
    InfoModal(label || 'Help', helpMessage);
  };
  return (
    <div className="customfield">
      <FormItem
        {...formItemLayout}
        label={label}
      >
        <Switch
          checked={input.value || false}
          onChange={handleChange}
          style={style}
        />
      </FormItem>
      {
        helpMessage &&
        <FontAwesomeIcon
          className="customfield__switch-help"
          icon={faQuestionSquare}
          onClick={openModal}
          size="2x"
        />
      }
    </div>
  );
};

CustomSwitch.defaultProps = {
  helpMessage: null,
  formItemLayout: {},
  label: null,
  onChange: null,
  style: {},
};

CustomSwitch.propTypes = {
  helpMessage: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ]),
  formItemLayout: PropTypes.shape({
    labelCol: PropTypes.shape({}),
    wrapperCol: PropTypes.shape({}),
  }),
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  }).isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.shape({}),
};

export default CustomSwitch;
