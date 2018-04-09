import React from 'react';
import { Modal } from 'antd';

import InfoModal from './info-modal';

jest.mock('antd');
Modal.info = jest.fn();

afterAll(() => {
  jest.unmock('antd');
});

describe('InfoModal', () => {
  test('Calls ant modal with string', () => {
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

  test('Calls ant modal with component', () => {
    const testComponent = (
      <div>
        message
      </div>
    );
    InfoModal('title', testComponent);
    expect(Modal.info).toHaveBeenCalledWith({
      title: 'title',
      content: (
        <div>
          {testComponent}
        </div>
      ),
      maskClosable: true,
      okText: 'close',
      width: 600,
    });
  });
});
