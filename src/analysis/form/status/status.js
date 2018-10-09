import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'antd';

import Content from './status__contents';

import './status.css';

const Status = ({
  closeModal,
  status,
  taskID,
  visible,
}) => (
  <Modal
    closable={false}
    footer={[
      <Button key="close" onClick={closeModal} type="primary">Close</Button>,
    ]}
    onCancel={closeModal}
    okText="Close"
    title={`Task ID: ${taskID}`}
    visible={visible}
  >
    <div className="analysis__task-status">
      <Content
        id={taskID}
        status={status}
      />
    </div>
  </Modal>
);

Status.defaultProps = {
  taskID: null,
};

Status.propTypes = {
  closeModal: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  taskID: PropTypes.string,
  visible: PropTypes.bool.isRequired,
};

export default Status;
