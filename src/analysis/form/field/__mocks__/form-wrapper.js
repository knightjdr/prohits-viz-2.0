import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'antd';

const TestForm = ({
  children,
  form,
  input,
  onSubmit,
}) => {
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={(e) => { onSubmit(e, form); }}>
      {
        React.cloneElement(
          children,
          {
            getFieldDecorator,
            input,
          },
        )
      }
      <button
        type="submit"
      />
    </Form>
  );
};

TestForm.defaultProps = {
  onSubmit: (e, form) => { form.validateFields(); },
};

TestForm.propTypes = {
  children: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
  onSubmit: PropTypes.func,
};

export default Form.create()(TestForm);
