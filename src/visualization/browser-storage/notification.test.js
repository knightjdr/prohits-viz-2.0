import { notification } from 'antd';

import Notification, { notificationType } from './notification';

notification.config = jest.fn();
notification.open = jest.fn();

describe('Session notification', () => {
  it('should call success notification', () => {
    Notification('description', true);
    expect(notification.config).toHaveBeenCalled();
    expect(notification.open).toHaveBeenCalledWith({
      description: 'description',
      icon: notificationType.true.icon,
      message: notificationType.true.message,
    });
  });

  it('should call failure notification', () => {
    Notification('description', false);
    expect(notification.config).toHaveBeenCalled();
    expect(notification.open).toHaveBeenCalledWith({
      description: 'description',
      icon: notificationType.false.icon,
      message: notificationType.false.message,
    });
  });
});
