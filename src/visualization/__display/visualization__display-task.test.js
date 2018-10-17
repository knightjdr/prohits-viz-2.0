import React from 'react';
import { shallow } from 'enzyme';

import DisplayTask from './visualization__display-task';

jest.mock('../../tasks/tasks-container');

describe('DisplayTask', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <DisplayTask
        match={{
          params: { id: 'task1' },
        }}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set child ID prop', () => {
    expect(wrapper.props().id).toBe('task1');
  });
});
