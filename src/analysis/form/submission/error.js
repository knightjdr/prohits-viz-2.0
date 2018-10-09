import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'antd';

const Error = ({
  closeModal,
  visible,
}) => (
  <Modal
    closable={false}
    footer={[
      <Button key="close" onClick={closeModal} type="primary">Close</Button>,
    ]}
    onCancel={closeModal}
    okText="Close"
    title="Error"
    visible={visible}
  >
    There was an error submitting this task.
  </Modal>
);

Error.propTypes = {
  closeModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Error;
