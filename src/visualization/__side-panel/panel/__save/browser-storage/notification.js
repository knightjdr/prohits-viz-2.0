import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import React from 'react';
import { faCheck, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { notification } from 'antd';

export const notificationType = {
  false: {
    icon: <FontAwesomeIcon icon={faTimes} style={{ color: '#f44336' }} />,
    message: 'Failure',
  },
  true: {
    icon: <FontAwesomeIcon icon={faCheck} style={{ color: '#43a047' }} />,
    message: 'Success',
  },
};

const Notification = (description, success) => {
  notification.config({
    placement: 'topLeft',
    top: 60,
    duration: 3,
  });
  notification.open({
    description,
    icon: notificationType[success].icon,
    message: notificationType[success].message,
  });
};
export default Notification;
