import React from 'react';
import { shallow } from 'enzyme';

import Modal from './tasks__modal';

const closeModal = jest.fn();

describe('Tasks modal', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Modal
        closeModal={closeModal}
        modalContent="test"
        title="Test"
        visible
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass title to modal', () => {
    expect(wrapper.find('Modal').props().title).toBe('Test');
  });

  it('should close modal via footer button', () => {
    closeModal.mockClear();
    wrapper.find('Modal').props().footer[0].props.onClick();
    expect(closeModal).toHaveBeenCalled();
  });

  it('should close modal via onCancel prop', () => {
    closeModal.mockClear();
    wrapper.find('Modal').props().onCancel();
    expect(closeModal).toHaveBeenCalled();
  });
});
