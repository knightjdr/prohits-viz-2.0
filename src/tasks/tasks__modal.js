import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'antd';

import './tasks.css';

const Tasks = ({
  closeModal,
  modalContent,
  title,
  visible,
}) => (
  <Modal
    footer={[
      <Button key="close" onClick={closeModal} type="primary">Close</Button>,
    ]}
    onCancel={closeModal}
    okText="Close"
    title={title}
    visible={visible}
  >
    <div className="tasks__modal">
      {modalContent}
    </div>
  </Modal>
);

Tasks.defaultProps = {
  modalContent: null,
  title: null,
};

Tasks.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalContent: PropTypes.string,
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
};

export default Tasks;
