import React from 'react';
import { shallow } from 'enzyme';

import Status from './tasks__status';

describe('Task status', () => {
  it('should match snapshot on error', () => {
    const wrapper = shallow(
      <Status
        error
        isUpdating={false}
        taskNo={0}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when task missing', () => {
    const wrapper = shallow(
      <Status
        error={false}
        missing
        isUpdating={false}
        taskNo={0}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when updating', () => {
    const wrapper = shallow(
      <Status
        error={false}
        isUpdating
        taskNo={0}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when there are no tasks', () => {
    const wrapper = shallow(
      <Status
        error={false}
        isUpdating={false}
        taskNo={0}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when tasks cannot be found', () => {
    const wrapper = shallow(
      <Status
        error={false}
        isUpdating={false}
        taskNo={1}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
