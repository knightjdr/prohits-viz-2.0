import React from 'react';
import { Modal } from 'antd';

const InfoModal = (title, message) => {
  const content = typeof message === 'string' ?
    (
      <p>
        {message}
      </p>
    )
    :
    message;
  Modal.info({
    title,
    content: (
      <div>
        {content}
      </div>
    ),
    maskClosable: true,
    okText: 'close',
    width: 600,
  });
};
export default InfoModal;
