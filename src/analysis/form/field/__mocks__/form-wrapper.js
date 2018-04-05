import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'antd';

const TestForm = ({
  children,
  input,
  meta,
  onSubmit,
}) => (
  <Form onSubmit={(e) => { onSubmit(e); }}>
    {
      React.cloneElement(
        children,
        {
          input,
          meta,
        },
      )
    }
    <button
      type="submit"
    />
  </Form>
);

TestForm.defaultProps = {
  onSubmit: (e, form) => { form.validateFields(); },
};

TestForm.propTypes = {
  children: PropTypes.shape({}).isRequired,
  input: PropTypes.shape({
    change: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
    warning: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func,
};

export default TestForm;
