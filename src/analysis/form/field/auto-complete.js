import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { AutoComplete, Form } from 'antd';
import { faQuestionSquare } from '@fortawesome/pro-solid-svg-icons';

import InfoModal from './info-modal';

import './field.css';

/* auto complete wrapped in Ant design's <FormItem>, whose initial state will
** be set from the redux store's 'input' */

const FormItem = Form.Item;

const CustomAutoComplete = ({
  dataSource,
  handleSearch,
  helpMessage,
  input,
  label,
  meta,
  onChange,
  onSelect,
  placeHolder,
  style,
  value,
}) => {
  const handleSelect = (selectedValue) => {
    onSelect(selectedValue, input);
  };
  const onBlur = () => {
    onSelect(value, input);
  };
  const openModal = () => {
    InfoModal(label || 'Help', helpMessage);
  };

  const { error, touched } = meta;
  const formError = touched && error;

  return (
    <div className="customfield">
      <FormItem
        className="customfield__form-item"
        label={label}
        help={formError ? error : ''}
        validateStatus={formError ? 'error' : ''}
      >
        <AutoComplete
          dataSource={dataSource}
          onBlur={onBlur}
          onChange={onChange}
          onSelect={handleSelect}
          onSearch={handleSearch}
          placeholder={placeHolder}
          style={style}
          value={value}
        />
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

CustomAutoComplete.defaultProps = {
  helpMessage: null,
  label: null,
  value: undefined,
};

CustomAutoComplete.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  handleSearch: PropTypes.func.isRequired,
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
  onSelect: PropTypes.func.isRequired,
  placeHolder: PropTypes.string.isRequired,
  style: PropTypes.shape({}).isRequired,
  value: PropTypes.string,
};

export default CustomAutoComplete;
