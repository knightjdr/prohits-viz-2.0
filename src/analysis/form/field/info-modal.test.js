import React from 'react';
import { Modal } from 'antd';

import InfoModal from './info-modal';

jest.mock('antd');
Modal.info = jest.fn();

afterAll(() => {
  jest.unmock('antd');
});

describe('InfoModal', () => {
  test('Call ant modal', () => {
    InfoModal('title', 'message');
    expect(Modal.info).toHaveBeenCalledWith({
      title: 'title',
      content: (
        <div>
          <p>message</p>
        </div>
      ),
      maskClosable: true,
      okText: 'close',
      width: 600,
    });
  });
});
