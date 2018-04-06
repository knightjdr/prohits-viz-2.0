import React from 'react';
import { Modal } from 'antd';

const InfoModal = (title, message) => {
  Modal.info({
    title,
    content: (
      <div>
        <p>{message}</p>
      </div>
    ),
    maskClosable: true,
    okText: 'close',
    width: 600,
  });
};
export default InfoModal;
