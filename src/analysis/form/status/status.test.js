import React from 'react';
import { shallow } from 'enzyme';

import Status from './status';

const closeModal = jest.fn();

describe('Status', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Status
        closeModal={closeModal}
        status="running"
        taskID="taskID"
        visible
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass task ID to modal', () => {
    expect(wrapper.find('Modal').props().title).toBe('Task ID: taskID');
  });

  it('should close modal', () => {
    wrapper.find('Modal').props().footer[0].props.onClick();
    expect(closeModal).toHaveBeenCalled();
  });
});
