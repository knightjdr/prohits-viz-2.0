import React from 'react';
import { shallow } from 'enzyme';

import Error from './error';

const closeModal = jest.fn();

describe('Error modal', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Error
        closeModal={closeModal}
        visible
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
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
